package com.jb.configs;

import com.jb.entity.ChatMessage;
import org.springframework.stereotype.Component;

@Component
public class ChatLongPollRegistry extends LongPollRegistry<ChatMessage> {
}