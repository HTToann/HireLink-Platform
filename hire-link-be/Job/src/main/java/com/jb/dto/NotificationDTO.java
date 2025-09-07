package com.jb.dto;

import com.jb.entity.Notification;
import com.jb.enums.NotificationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long id;
    @NotNull(message = "User ID is required")
    private Long userId;
    @NotBlank(message = "Message is required")
    @Size(max = 500, message = "Message must not exceed 500 characters")
    private String message;
    @NotBlank(message = "Action is required")
    private String action;
    @NotBlank(message = "Route is required")
    private String route;
    @NotNull(message = "Status is required")
    private NotificationStatus status;
    @NotNull(message = "Timestamp is required")
    private LocalDateTime timeStamp;
    public Notification toEntity() {
        return new Notification(this.id, this.userId, this.message,
                this.action,this.route, this.status, this.timeStamp);
    }
}
