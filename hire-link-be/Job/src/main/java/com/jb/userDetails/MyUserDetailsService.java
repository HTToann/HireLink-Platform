package com.jb.userDetails;

import com.jb.dto.UserDTO;
import com.jb.exception.JobException;
import com.jb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            UserDTO dto = userService.getUserByEmail(email);
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_" + String.valueOf(dto.getAccountType()).toUpperCase()));
            return new CustomUserDetails(
                    dto.getId(),dto.getName(),email,
                    dto.getPassword(),dto.getProfileId(),
                    dto.getAccountType(),authorities);
        } catch (JobException e) {
            throw new RuntimeException(e);
        }
    }
}
