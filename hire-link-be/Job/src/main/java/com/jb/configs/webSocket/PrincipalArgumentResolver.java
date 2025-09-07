package com.jb.configs.webSocket;

import org.springframework.core.MethodParameter;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.invocation.HandlerMethodArgumentResolver;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import java.security.Principal;

public class PrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return Principal.class.isAssignableFrom(parameter.getParameterType());
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, Message<?> message) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // Ưu tiên lấy từ header user
        Principal principal = accessor.getUser();
        if (principal != null) {
            return principal;
        }

        // Fallback từ sessionAttributes
        Object user = accessor.getSessionAttributes().get("user");
        if (user instanceof Principal) {
            return (Principal) user;
        }
        return null;
    }
}