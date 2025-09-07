package com.jb.userDetails;

import com.jb.enums.AccountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {

    private static final long serialVersionUID = 1L;
    private Long id;
    private String name;
    private String username;
    private String password;
    private Long profileId;
    private AccountType accountType;
    private Collection<? extends GrantedAuthority> authorities;
    @Override
    public String getUsername() {
        return username; // => principal.getName() sẽ trả về email
    }
}
