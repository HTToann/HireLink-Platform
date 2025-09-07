package com.jb.repository;

import com.jb.entity.ChatMessage;
import com.jb.entity.Notification;
import com.jb.enums.NotificationStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification,Long> {
    List<Notification> findByUserIdAndStatus(Long userId, NotificationStatus status);
    List<Notification> findByUserIdAndTimeStampAfter(Long userId, LocalDateTime after);
}
