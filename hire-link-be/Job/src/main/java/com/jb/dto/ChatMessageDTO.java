package com.jb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDTO {
    private String id;
    private String sender;
    private String recipient;
    private String recipientName;
    private String content;
    private LocalDateTime timestamp;

//    public ChatMessage toEntity () {
//        return new ChatMessage(this.id,this.sender,this.recipient,this.recipientName,this.content,this.timestamp);
//    }
}
