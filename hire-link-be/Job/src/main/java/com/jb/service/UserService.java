package com.jb.service;

import com.jb.dto.LoginDTO;
import com.jb.dto.ResponeDTO;
import com.jb.dto.UserDTO;
import com.jb.entity.User;
import com.jb.exception.JobException;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO) throws JobException;
    public UserDTO getUserByEmail(String email) throws JobException;
    public UserDTO loginUser(LoginDTO loginDTO) throws JobException;
    public Boolean sendOtp(String email) throws Exception, MessagingException;
    public Boolean verifyOtp(String email,String otp) throws JobException;
    public ResponeDTO changePassword(LoginDTO loginDTO) throws JobException;
    public User getUserById(Long id) throws JobException;
    public List<User> findAll() throws JobException;
    public void delete(User user) throws JobException;

    void deleteById(Long id);
}
