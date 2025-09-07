package com.jb.repository;

import com.jb.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, Long> {

    // Tất cả tin nhắn giữa 2 người
    @Query("{ '$or': [ { 'sender': ?0, 'recipient': ?1 }, { 'sender': ?1, 'recipient': ?0 } ] }")
    List<ChatMessage> findChatBetweenById(String userId1, String userId2);
    // Tất cả tin nhắn giữa 2 người, chưa bị userId1 xóa
    @Query("{ '$or': [ { 'sender': ?0, 'recipient': ?1 }, { 'sender': ?1, 'recipient': ?0 } ], 'deletedBy': { '$ne': ?0 } }")
    List<ChatMessage> findVisibleChatBetween(String userId1, String userId2);
    // Danh sách hội thoại liên quan đến user, không bị ẩn
    @Query("{ '$or': [ { 'sender': ?0 }, { 'recipient': ?0 } ], 'deletedBy': { '$ne': ?0 } }")
    List<ChatMessage> findAllConversationsVisibleToUser(String userId);

    @Query("{ '$or': [ { 'sender': ?0 }, { 'recipient': ?0 } ] }")
    List<ChatMessage> findByRecipientAndTimestampAfter(String recipientId, LocalDateTime after);

}