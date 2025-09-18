package com.jb.service;

import com.jb.dto.ChatDTO;
import com.jb.entity.ChatMessage;

import java.time.LocalDateTime;
import java.util.List;
public interface ChatService {
    List<ChatDTO> getChatContacts(String currentUserId);
    List<ChatMessage> findNewMessages(String recipientId, String after);
    List<ChatMessage> getVisibleConversation(String currentUserId, String otherUserId);
    void softDeleteConversation(String currentUserId, String otherUserId);
}
//public interface ChatService {
//    List<ChatDTO> getChatContacts(String currentUserId);
//    List<ChatMessage> findNewMessages(String recipientId, String after);
//    List<ChatMessage> getVisibleConversation(String currentUserId, String otherUserId);
//    void softDeleteConversation(String currentUserId, String otherUserId);
//}
