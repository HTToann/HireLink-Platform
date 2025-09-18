package com.jb.controller.api;

import com.jb.configs.LongPollRegistry;
import com.jb.dto.ResponeDTO;
import com.jb.entity.Notification;
import com.jb.exception.JobException;
import com.jb.service.NotificationService;
import com.jb.utility.LongPollHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.concurrent.ScheduledThreadPoolExecutor;

@RestController
@CrossOrigin
@RequestMapping("/api/notifications")
@Validated
public class NotificationControllerApi {
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private ScheduledThreadPoolExecutor longPollExecutor;
    @Autowired
    private LongPollRegistry<Notification> registry;
    @GetMapping("/get/{userId}")
    public ResponseEntity<List<Notification>> getNotification(@PathVariable Long userId) {
        return new ResponseEntity<>(notificationService.getUnreadNotification(userId), HttpStatus.OK);
    }
    @PatchMapping("/read/{id}")
    public ResponseEntity<ResponeDTO> readNotification(@PathVariable Long id) throws JobException {
        notificationService.readNotification(id);
        return new ResponseEntity<>(new ResponeDTO("Read notification successfully"), HttpStatus.OK);
    }
    @PutMapping("/read/all/{userId}")
    public ResponseEntity<?> markAllRead(@PathVariable Long userId) {
        notificationService.markAllAsRead(userId);
        return ResponseEntity.ok("Marked all as read");
    }
    @GetMapping("/long-poll")
    public DeferredResult<ResponseEntity<List<Notification>>> longPoll(
            @RequestParam Long userId,
            @RequestParam(required = false) String after
    ) {
        List<Notification> newNoti = notificationService.findNewNotifications(userId, after);

        if (!newNoti.isEmpty()) {
            // Có ngay → trả luôn
            DeferredResult<ResponseEntity<List<Notification>>> result = new DeferredResult<>();
            result.setResult(ResponseEntity.ok(newNoti));
            return result;
        }

        // Nếu chưa có → register chờ tối đa 30s
        DeferredResult<ResponseEntity<List<Notification>>> output =
                new DeferredResult<>(30_000L, ResponseEntity.ok(List.of()));

        registry.add(userId, output);

        return output;
    }

}
