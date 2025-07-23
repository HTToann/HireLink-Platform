package com.jb.repository;

import com.jb.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, Long> {
    @Query("{ '$or': [ { 'sender': ?0 }, { 'recipient': ?0 } ] }")
    List<ChatMessage> findAllConversations(String username);

    @Query("{ '$or': [ { 'sender': ?0, 'recipient': ?1 }, { 'sender': ?1, 'recipient': ?0 } ] }")
    List<ChatMessage> findChatBetweenById(String userId1, String userId2);
    @Query("{ '$or': [ { 'sender': ?0 }, { 'recipient': ?0 } ] }")
    List<ChatMessage> findAllConversationsByUserId(String userId);
    List<ChatMessage> findByRecipientAndTimestampAfter(String recipientId, LocalDateTime after);

}