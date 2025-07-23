package com.jb.service;

import com.jb.dto.NotificationDTO;
import com.jb.entity.Notification;
import com.jb.exception.JobException;

import java.util.List;

public interface NotificationService {
    public void sendNotification(NotificationDTO notificationDTO) throws JobException;
    public List<Notification> getUnreadNotification(Long userId);
    public void readNotification(Long notificationId) throws JobException;
    public void markAllAsRead(Long userId);
    public List<Notification> findNewNotifications(Long userId, String after);
}
