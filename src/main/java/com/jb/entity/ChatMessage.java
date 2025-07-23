package com.jb.entity;

import com.jb.dto.ChatMessage.ChatMessageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "chat_messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    @Id
    private Long id;
    private String sender;
    private String senderName;
    private String senderAvatarUrl;
    private String senderEmail;

    private String recipient;
    private String recipientName;
    private String recipientEmail;
    private String content;
    private LocalDateTime timestamp;

}
