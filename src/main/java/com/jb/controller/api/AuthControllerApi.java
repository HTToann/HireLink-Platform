package com.jb.controller.api;

import com.jb.jwt.AuthenticationRequest;
import com.jb.jwt.AuthenticationResponse;
import com.jb.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthControllerApi {
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest request) throws Exception {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
    final String token = JwtUtils.generateToken(userDetails);
//    System.out.println(token);
//    System.out.println(userDetails.getUsername());
//    System.out.println(userDetails.getPassword());
    return ResponseEntity.ok(new AuthenticationResponse(token));
    }
}
