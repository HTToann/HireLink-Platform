package com.jb.service.impl;

import com.jb.dto.ChatDTO;
import com.jb.entity.ChatMessage;
import com.jb.entity.Profile;
import com.jb.entity.User;
import com.jb.repository.ChatMessageRepository;
import com.jb.repository.ProfileRepository;
import com.jb.repository.UserRepository;
import com.jb.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service("chatService")
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatMessageRepository chatRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public List<ChatDTO> getChatContacts(String currentUserId) {
        List<ChatMessage> messages = chatRepository.findAllConversationsVisibleToUser(currentUserId);
        Set<Long> contactIds = new HashSet<>();

        for (ChatMessage msg : messages) {
            if (!msg.getSender().equals(currentUserId)) {
                contactIds.add(Long.valueOf(msg.getSender()));
            }
            if (!msg.getRecipient().equals(currentUserId)) {
                contactIds.add(Long.valueOf(msg.getRecipient()));
            }
        }

        List<User> users = userRepository.findByIdIn(contactIds);

        Set<Long> profileIds = users.stream()
                .map(User::getProfileId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Map<Long, Profile> profileMap = profileRepository.findByIdIn(profileIds)
                .stream().collect(Collectors.toMap(Profile::getId, p -> p));

        return users.stream().map(user -> {
            Profile profile = profileMap.get(user.getProfileId());
            return new ChatDTO(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    profile != null ? profile.getId() : null,
                    profile != null ? profile.getPicture() : null
            );
        }).toList();
    }

    @Override
    public List<ChatMessage> findNewMessages(String recipientId, String after) {
        LocalDateTime afterTime;
        if (after == null || after.isBlank()) {
            afterTime = LocalDateTime.now().minusMinutes(5);
        } else {
            try {
                Instant instant = Instant.parse(after);
                afterTime = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
            } catch (DateTimeParseException e1) {
                try {
                    afterTime = LocalDateTime.parse(after);
                } catch (DateTimeParseException e2) {
                    throw new RuntimeException("Invalid 'after' timestamp format: " + after);
                }
            }
        }

        // lấy tất cả message cho recipient sau thời điểm after
        List<ChatMessage> msgs = chatRepository.findByRecipientAndTimestampAfter(recipientId, afterTime);

        // dedupe theo clientId hoặc id
        Map<String, ChatMessage> unique = new LinkedHashMap<>();
        for (ChatMessage m : msgs) {
            String key = (m.getClientId() != null ? m.getClientId() : "id:" + m.getId());
            unique.putIfAbsent(key, m);
        }
        return new ArrayList<>(unique.values());
    }

    @Override
    public List<ChatMessage> getVisibleConversation(String currentUserId, String otherUserId) {
        return chatRepository.findVisibleChatBetween(currentUserId, otherUserId);
    }

    @Override
    public void softDeleteConversation(String currentUserId, String otherUserId) {
        List<ChatMessage> messages = chatRepository.findChatBetweenById(currentUserId, otherUserId);
        for (ChatMessage msg : messages) {
            msg.getDeletedBy().add(currentUserId);
        }
        chatRepository.saveAll(messages);
    }
}
