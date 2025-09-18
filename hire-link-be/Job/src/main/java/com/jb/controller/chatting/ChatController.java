package com.jb.controller.chatting;

import com.jb.configs.ChatLongPollRegistry;
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
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;
    private final ChatMessageRepository chatRepo;
    private final ProfileService profileService;
    private final NotificationService notificationService;
    private final ChatLongPollRegistry registry;
    @MessageMapping("/chat.private")
    public void sendPrivateMessage(@Payload ChatMessage message, Principal principal) throws JobException {
        Authentication authentication = (Authentication) principal;
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Long senderId = userDetails.getId();
        String senderEmail = userDetails.getUsername();
        String senderName = userDetails.getName();

        ProfileDTO sender = profileService.getProfile(senderId);

        // preserve clientId từ FE
        String clientId = message.getClientId();

        message.setId(Ultis.getNextSequence("chat"));
        message.setClientId(clientId);
        message.setSender(senderId.toString());
        message.setSenderName(senderName);
        message.setSenderAvatarUrl(sender.getPicture());
        message.setSenderEmail(senderEmail);
        message.setTimestamp(LocalDateTime.now());

        Long recipientId = Long.parseLong(message.getRecipient());
        User recipient = userService.getUserById(recipientId);

        message.setRecipient(recipientId.toString());
        message.setRecipientName(recipient.getName());
        message.setRecipientEmail(recipient.getEmail());
        sendNotification("Chatting",String.format("Do you have 1 message"),recipientId,String.format("/chat/%s",senderId));
        ChatMessage saved = chatRepo.save(message);

        registry.publish(recipientId, List.of(saved));

        // gửi cho recipient
        messagingTemplate.convertAndSendToUser(
                saved.getRecipientEmail(),
                "/queue/messages",
                saved
        );

        // gửi lại cho sender (để FE replace optimistic)
        messagingTemplate.convertAndSendToUser(
                senderEmail,
                "/queue/messages",
                saved
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