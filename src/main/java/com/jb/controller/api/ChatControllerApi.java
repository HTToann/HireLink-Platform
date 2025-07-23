package com.jb.controller.api;

import com.jb.dto.ChatDTO;
import com.jb.dto.ChatMessage.ChatMessageDTO;
import com.jb.dto.UserDTO;
import com.jb.entity.ChatMessage;
import com.jb.jwt.CustomUserDetails;
import com.jb.repository.ChatMessageRepository;
import com.jb.service.ChatService;
import com.jb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/messages")
public class ChatControllerApi {

    @Autowired
    private ChatMessageRepository chatRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private ChatService chatService;

    // Lấy lịch sử chat giữa 2 người
    @GetMapping("/{otherUserId}")
    public List<ChatMessage> getConversation(@AuthenticationPrincipal UserDetails user,
                                             @PathVariable String otherUserId) {
        String currentUserId = ((CustomUserDetails) user).getId().toString();
        return new ResponseEntity<>(chatService.findChatBetweenById(currentUserId, otherUserId), HttpStatus.OK).getBody();
    }
    @GetMapping("/contacts")
    public List<ChatDTO> getContacts(@AuthenticationPrincipal UserDetails user) {
        String userId = ((CustomUserDetails) user).getId().toString();
        return chatService.getChatContacts(userId);
    }
    @GetMapping("/long-poll")
    public DeferredResult<ResponseEntity<List<ChatMessage>>> longPollMessages(
            @RequestParam String recipientId,
            @RequestParam String after // timestamp dạng ISO-8601
    ) {
        DeferredResult<ResponseEntity<List<ChatMessage>>> output = new DeferredResult<>(30000L);

        Runnable pollingTask = () -> {
            while (!output.isSetOrExpired()) {
                List<ChatMessage> newMessages = chatService.findNewMessages(recipientId,after);
                if (!newMessages.isEmpty()) {
                    output.setResult(ResponseEntity.ok(newMessages)); // trả về ngay khi có tin mới
                    break;
                }
                try {
                    Thread.sleep(1000); // Check mỗi 1 giây
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        };

        // Start polling
        new Thread(pollingTask).start(); // mỗi request là 1 thread riêng

        output.onTimeout(() -> output.setResult(ResponseEntity.ok(List.of()))); // trả về [] nếu hết 30s không có gì

        return output;
    }

}
