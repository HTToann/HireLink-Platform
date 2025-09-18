package com.jb.service.impl;

import com.jb.configs.LongPollRegistry;
import com.jb.dto.NotificationDTO;
import com.jb.entity.Notification;
import com.jb.enums.NotificationStatus;
import com.jb.exception.JobException;
import com.jb.repository.NotificationRepository;
import com.jb.service.NotificationService;
import com.jb.utility.Ultis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service("notificationService")
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private  LongPollRegistry<Notification> registry;
    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws JobException {
        notificationDTO.setId(Ultis.getNextSequence("notification"));
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimeStamp(LocalDateTime.now());

        Notification entity = notificationDTO.toEntity();

        Notification saved = notificationRepository.save(entity);

        registry.publish(notificationDTO.getUserId(), List.of(saved));
    }

    @Override
    public List<Notification> getUnreadNotification(Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
    }

    @Override
    public void readNotification(Long notificationId) throws JobException {
        Notification notification=notificationRepository.findById(notificationId).
                orElseThrow(() -> new JobException("Notification not found"));
        notification.setStatus(NotificationStatus.READ);
        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead(Long userId) {
        List<Notification> list = getUnreadNotification(userId);
        for (Notification n : list) {
            n.setStatus(NotificationStatus.READ);
        }
        notificationRepository.saveAll(list);
    }

    @Override
    public List<Notification> findNewNotifications(Long userId, String after) {
        LocalDateTime afterTime;
        if (after == null || after.isBlank()) {
            afterTime = LocalDateTime.now().minusMinutes(5);
        } else {
            try {
                afterTime = LocalDateTime.parse(after); // Parse dạng ISO-8601
            } catch (DateTimeParseException e) {
                throw new RuntimeException(" Invalid 'after' timestamp format: " + after);
            }
        }
        return this.notificationRepository.findByUserIdAndTimeStampAfter(userId,afterTime);
    }
}
