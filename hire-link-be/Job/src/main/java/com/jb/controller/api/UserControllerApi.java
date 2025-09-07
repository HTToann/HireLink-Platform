package com.jb.controller.api;

import com.jb.dto.LoginDTO;
import com.jb.dto.ResponeDTO;
import com.jb.dto.UserDTO;
import com.jb.exception.JobException;
import com.jb.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
@Validated
public class UserControllerApi {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws JobException {
        userDTO=userService.registerUser(userDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobException {
        return new ResponseEntity<>(userService.loginUser(loginDTO), HttpStatus.OK);
    }
    @PostMapping("/changePassword")
    public ResponseEntity<ResponeDTO> changePassword(@RequestBody @Valid LoginDTO loginDTO) throws JobException {
        return new ResponseEntity<>(userService.changePassword(loginDTO), HttpStatus.OK);
    }
    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponeDTO> sendOtp(@PathVariable
    @Email(message="Email is invalid.") String email
    ) throws Exception {
        userService.sendOtp(email);
        return new ResponseEntity<>(new ResponeDTO("OTP sent successfully."), HttpStatus.CREATED);
    }
    @GetMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<ResponeDTO> verifyOtp(@PathVariable @Email(message="Email invalid.") String email,
                                                @PathVariable @Pattern(regexp = "^[0-9]{6}$", message = "OTP is invalid.") String otp
    ) throws Exception {
        userService.verifyOtp(email,otp);
        return new ResponseEntity<>(new ResponeDTO("OTP has been verified."), HttpStatus.OK);
    }

}
