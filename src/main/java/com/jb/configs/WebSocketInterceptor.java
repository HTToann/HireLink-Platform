package com.jb.configs;
import com.jb.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class WebSocketInterceptor implements ChannelInterceptor {

    private final UserDetailsService userDetailsService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            List<String> authHeaders = accessor.getNativeHeader("Authorization");
            if (authHeaders != null && !authHeaders.isEmpty()) {
                String token = authHeaders.get(0).replace("Bearer ", "");
                try {
                    String username = JwtUtils.validateTokenAndGetUsername(token);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    accessor.setUser(auth);
                    accessor.getSessionAttributes().put("user", auth);

//                    System.out.println("✅ WebSocket Authenticated as " + username);
                } catch (Exception e) {
//                    System.out.println("❌ Token invalid: " + e.getMessage());
                    return null;
                }
            }
        } else {
            Principal principal = accessor.getUser();
            if (principal == null) {
                Object auth = accessor.getSessionAttributes().get("user");
                if (auth instanceof Authentication authentication) {
                    accessor.setUser(authentication);
//                    System.out.println("✅ Reattached Principal: " + authentication.getName());
                }
//                else {
////                    System.out.println("❌ No valid Principal in session");
//                }
            }
        }

        return MessageBuilder.createMessage(message.getPayload(), accessor.getMessageHeaders());
    }
}