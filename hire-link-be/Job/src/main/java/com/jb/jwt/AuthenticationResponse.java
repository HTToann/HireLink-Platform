package com.jb.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AuthenticationResponse {
    public AuthenticationResponse(String token) {
        this.token = token;
    }
    private final String token;
}
