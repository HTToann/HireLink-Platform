package com.jb.controller.chatting;

import com.jb.dto.NotificationDTO;
import com.jb.dto.ProfileDTO;
import com.jb.entity.ChatMessage;
import com.jb.entity.User;
import com.jb.exception.JobException;
import com.jb.userDetails.CustomUserDetails;
import com.jb.repository.ChatMessageRepository;
import com.jb.service.NotificationService;
import com.jb.service.ProfileService;
import com.jb.service.UserService;
import com.jb.utility.Ultis;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;
    private final ChatMessageRepository chatRepo;
    private final ProfileService profileService;
    private final NotificationService notificationService;
    @MessageMapping("/chat.private")
    public void sendPrivateMessage(@Payload ChatMessage message, Principal principal) throws JobException {
        if (principal == null) {
            System.out.println("Principal is null");
            return;
        }
        Authentication authentication = (Authentication) principal;
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Long senderId = userDetails.getId();
        String senderEmail = userDetails.getUsername();
        String senderName = userDetails.getName();

//        //log
//        System.out.println("New message received");
//        System.out.println("From: " + senderName + " (" + senderEmail + ")");
//        System.out.println("To: " + message.getRecipient());
//        System.out.println("Content: " + message.getContent());
        ProfileDTO sender = profileService.getProfile(senderId);
        // Prepare message
        message.setId(Ultis.getNextSequence("chat"));
        message.setSender(senderId.toString());
        message.setSenderName(senderName);
        message.setSenderAvatarUrl(sender.getPicture());
        message.setSenderEmail(senderEmail);


        Long recipientId = Long.parseLong(message.getRecipient());
        User recipient = userService.getUserById(recipientId);
        ProfileDTO recipientProfile = profileService.getProfile(recipientId);
        String recipientEmail = recipient.getEmail();
        message.setRecipient(recipientId.toString());
        message.setRecipientName(recipient.getName());
        message.setRecipientEmail(recipientEmail);
        message.setTimestamp(LocalDateTime.now());
        sendNotification("Chatting",String.format("Do you have 1 message"),recipientId,String.format("/chat/%s",senderId));


        chatRepo.save(message);

        messagingTemplate.convertAndSendToUser(
                message.getRecipientEmail(),
                "/queue/messages",
                message
        );

    }
    private void sendNotification(String action,String message,Long userId,String route) {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setAction(action);
        notificationDTO.setMessage(message);
        notificationDTO.setUserId(userId);
        notificationDTO.setRoute(route);
        try {
            notificationService.sendNotification(notificationDTO);
        } catch (JobException e) {
            throw new RuntimeException(e);
        }
    }
}