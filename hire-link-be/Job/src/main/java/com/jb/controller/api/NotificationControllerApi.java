package com.jb.controller.api;

import com.jb.dto.ResponeDTO;
import com.jb.entity.Notification;
import com.jb.exception.JobException;
import com.jb.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/notifications")
@Validated
public class NotificationControllerApi {
    @Autowired
    private NotificationService notificationService;

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
    public DeferredResult<ResponseEntity<List<Notification>>> longPollNotifications(
            @RequestParam Long userId,
            @RequestParam(required = false) String after
    ) {
        DeferredResult<ResponseEntity<List<Notification>>> output = new DeferredResult<>(30000L);

        Runnable pollingTask = () -> {
            while (!output.isSetOrExpired()) {
                List<Notification> newNoti = notificationService.findNewNotifications(userId, after);
                if (!newNoti.isEmpty()) {
                    output.setResult(ResponseEntity.ok(newNoti));
                    break;
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        };

        new Thread(pollingTask).start();
        output.onTimeout(() -> output.setResult(ResponseEntity.ok(List.of())));

        return output;
    }
}
