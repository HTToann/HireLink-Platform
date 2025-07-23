package com.jb.configs;

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
//            System.out.println("Resolved Principal from accessor: " + principal.getName());
            return principal;
        }

        // Fallback từ sessionAttributes
        Object user = accessor.getSessionAttributes().get("user");
        if (user instanceof Principal) {
//            System.out.println("Resolved Principal from session: " + ((Principal) user).getName());
            return (Principal) user;
        }

//        System.out.println("Principal vẫn null trong resolver");
        return null;
    }
}