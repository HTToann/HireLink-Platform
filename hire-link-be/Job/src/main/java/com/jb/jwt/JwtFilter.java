    package com.jb.jwt;

    import jakarta.servlet.FilterChain;
    import jakarta.servlet.ServletException;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
    import org.springframework.stereotype.Component;
    import org.springframework.web.filter.OncePerRequestFilter;

    import java.io.IOException;

    public class JwtFilter extends OncePerRequestFilter {
        private final UserDetailsService userDetailsService;
        public JwtFilter(UserDetailsService userDetailsService) {
            this.userDetailsService = userDetailsService;
        }
        @Override
        protected void doFilterInternal(HttpServletRequest request,
                                        HttpServletResponse response,
                                        FilterChain filterChain)
                throws ServletException, IOException {
            try {
                String uri = request.getRequestURI();
                if (!uri.startsWith("/api/auth")) {
                    String authHeader = request.getHeader("Authorization");
                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        SecurityContextHolder.clearContext();
                        String token = authHeader.substring(7);
                        String username = JwtUtils.validateTokenAndGetUsername(token);

                        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
    //                        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
    //                        UsernamePasswordAuthenticationToken authToken =
    //                                new UsernamePasswordAuthenticationToken(username, null, Collections.singletonList(authority));
                            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//                            System.out.println("ABC" +userDetails.getUsername());
                            UsernamePasswordAuthenticationToken authToken =
                                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                           authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println("JWT error: " + e.getMessage());
                 response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                 return;
            }

            filterChain.doFilter(request, response);
        }
    }
