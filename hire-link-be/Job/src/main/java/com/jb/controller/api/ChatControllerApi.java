package com.jb.controller.api;

import com.jb.configs.ChatLongPollRegistry;
import com.jb.dto.ChatDTO;
import com.jb.entity.ChatMessage;
import com.jb.service.ChatService;
import com.jb.userDetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class ChatControllerApi {

    private final ChatService chatService;
    private final ChatLongPollRegistry registry;

    @GetMapping("/{otherUserId}")
    public ResponseEntity<List<ChatMessage>> getConversation(
            @AuthenticationPrincipal UserDetails user,
            @PathVariable String otherUserId) {
        String currentUserId = ((CustomUserDetails) user).getId().toString();
        List<ChatMessage> messages = chatService.getVisibleConversation(currentUserId, otherUserId);
        return ResponseEntity.ok(messages);
    }

    @DeleteMapping("/{otherUserId}")
    public ResponseEntity<Void> deleteConversation(
            @AuthenticationPrincipal UserDetails user,
            @PathVariable String otherUserId) {
        String currentUserId = ((CustomUserDetails) user).getId().toString();
        chatService.softDeleteConversation(currentUserId, otherUserId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/contacts")
    public List<ChatDTO> getContacts(@AuthenticationPrincipal UserDetails user) {
        String userId = ((CustomUserDetails) user).getId().toString();
        return chatService.getChatContacts(userId);
    }

    @GetMapping("/long-poll")
    public DeferredResult<ResponseEntity<List<ChatMessage>>> longPollMessages(
            @AuthenticationPrincipal UserDetails user,
            @RequestParam String recipientId,
            @RequestParam(required = false) String after
    ) {
        String currentUserId = ((CustomUserDetails) user).getId().toString();
        List<ChatMessage> newMsgs = chatService.findNewMessages(recipientId, after);

        if (!newMsgs.isEmpty()) {
            // trả ngay nếu có tin mới
            DeferredResult<ResponseEntity<List<ChatMessage>>> result = new DeferredResult<>();
            result.setResult(ResponseEntity.ok(newMsgs));
            return result;
        }

        // nếu chưa có tin mới thì register chờ
        DeferredResult<ResponseEntity<List<ChatMessage>>> output =
                new DeferredResult<>(30_000L, ResponseEntity.ok(List.of()));

        registry.add(Long.parseLong(currentUserId), output);
        return output;
    }
}
//
//import com.jb.dto.ChatDTO;
//import com.jb.entity.ChatMessage;
//import com.jb.userDetails.CustomUserDetails;
//import com.jb.repository.ChatMessageRepository;
//import com.jb.service.ChatService;
//import com.jb.service.UserService;
//import com.jb.utility.LongPollHandler;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.context.request.async.DeferredResult;
//
//import java.util.List;
//import java.util.concurrent.ScheduledExecutorService;
//import java.util.concurrent.ScheduledFuture;
//import java.util.concurrent.ScheduledThreadPoolExecutor;
//import java.util.concurrent.TimeUnit;
//import java.util.concurrent.atomic.AtomicBoolean;
//
//@RestController
//@RequestMapping("/api/messages")
//public class ChatControllerApi {
//
//    @Autowired
//    private ChatMessageRepository chatRepo;
//    @Autowired
//    private UserService userService;
//    @Autowired
//    private ChatService chatService;
//    @Autowired
//    private ScheduledThreadPoolExecutor longPollExecutor;
//    // Lấy lịch sử chat giữa 2 người
//    @GetMapping("/{otherUserId}")
//    public ResponseEntity<List<ChatMessage>> getConversation(@AuthenticationPrincipal UserDetails user,
//                                                             @PathVariable String otherUserId) {
//        String currentUserId = ((CustomUserDetails) user).getId().toString();
//        List<ChatMessage> messages = chatService.getVisibleConversation(currentUserId, otherUserId);
//        return ResponseEntity.ok(messages);
//    }
//    @DeleteMapping("/{otherUserId}")
//    public ResponseEntity<Void> deleteConversation(@AuthenticationPrincipal UserDetails user,
//                                                   @PathVariable String otherUserId) {
//        String currentUserId = ((CustomUserDetails) user).getId().toString();
//        chatService.softDeleteConversation(currentUserId, otherUserId);
//        return ResponseEntity.noContent().build();
//    }
//    @GetMapping("/contacts")
//    public List<ChatDTO> getContacts(@AuthenticationPrincipal UserDetails user) {
//        String userId = ((CustomUserDetails) user).getId().toString();
//        return chatService.getChatContacts(userId);
//    }
//    @GetMapping("/long-poll")
//    public DeferredResult<ResponseEntity<List<ChatMessage>>> longPollMessages(
//            @RequestParam String recipientId,
//            @RequestParam String after
//    ) {
//        LongPollHandler<ChatMessage> handler = new LongPollHandler<>(longPollExecutor);
//        return handler.handle(
//                30_000, // timeout 30s
//                1000,   // check mỗi 1s
//                () -> chatService.findNewMessages(recipientId, after)
//        );
//    }
////    @GetMapping("/long-poll")
////    public DeferredResult<ResponseEntity<List<ChatMessage>>> longPollMessages(
////            @RequestParam String recipientId,
////            @RequestParam String after // timestamp dạng ISO-8601
////    ) {
////        DeferredResult<ResponseEntity<List<ChatMessage>>> output = new DeferredResult<>(30000L);
////
////        Runnable pollingTask = () -> {
////            while (!output.isSetOrExpired()) {
////                List<ChatMessage> newMessages = chatService.findNewMessages(recipientId,after);
////                if (!newMessages.isEmpty()) {
////                    output.setResult(ResponseEntity.ok(newMessages)); // trả về ngay khi có tin mới
////                    break;
////                }
////                try {
////                    Thread.sleep(1000); // Check mỗi 1 giây
////                } catch (InterruptedException e) {
////                    Thread.currentThread().interrupt();
////                    break;
////                }
////            }
////        };
////
////        // Start polling
////        new Thread(pollingTask).start(); // mỗi request là 1 thread riêng
////
////        output.onTimeout(() -> output.setResult(ResponseEntity.ok(List.of()))); // trả về [] nếu hết 30s không có gì
////
////        return output;
////    }
//
//}
