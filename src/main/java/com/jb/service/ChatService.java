package com.jb.service;

import com.jb.dto.ChatDTO;
import com.jb.entity.ChatMessage;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatService {
    List<ChatDTO> getChatContacts(String currentUserId);
    List<ChatMessage> findChatBetweenById(String userId1, String userId2);
    List<ChatMessage> findNewMessages(String recipientId, String after);
}
