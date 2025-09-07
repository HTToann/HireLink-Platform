package com.jb.service.impl;

import com.jb.dto.LoginDTO;
import com.jb.dto.NotificationDTO;
import com.jb.dto.ResponeDTO;
import com.jb.dto.UserDTO;
import com.jb.entity.Job;
import com.jb.entity.OTP.HtmlOTP;
import com.jb.entity.OTP.OTP;
import com.jb.entity.User;
import com.jb.exception.JobException;
import com.jb.repository.OTPRepository;
import com.jb.repository.UserRepository;
import com.jb.service.NotificationService;
import com.jb.service.ProfileService;
import com.jb.service.UserService;
import com.jb.utility.Ultis;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service(value="userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OTPRepository otpRepository;
    @Autowired
    private ProfileService profileService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private NotificationService notificationService;
    @Override
    public UserDTO registerUser(UserDTO userDTO) throws JobException {
        Optional<User> optional=userRepository.findByEmail(userDTO.getEmail());
//        if(optional.isPresent()) throw new JobException("User already exists");
        userDTO.setId(Ultis.getNextSequence("users"));
        userDTO.setProfileId(profileService.createProfile(userDTO.getEmail(),userDTO.getName()));
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user = userDTO.toEntity();
         user=userRepository.save(user);
    return user.toDTO();
    }

    @Override
    public UserDTO getUserByEmail(String email) throws JobException {
        return userRepository.findByEmail(email).
                orElseThrow(()-> new JobException("User not found")).toDTO();
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) throws JobException {
        User user =userRepository.findByEmail(loginDTO.getEmail()).
                orElseThrow(()-> new JobException("User not found"));
    if(!passwordEncoder.matches(loginDTO.getPassword(),user.getPassword())){
        throw new JobException("Wrong password");
    }
    return user.toDTO();
    }

    @Override
    public Boolean sendOtp(String email) throws Exception, MessagingException {
        User user =userRepository.findByEmail(email).
                orElseThrow(()-> new JobException("User not found"));
        MimeMessage mm = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mm,true);
        helper.setTo(email);
        helper.setSubject("Your OTP Code :");
        String genOTP = Ultis.generateOTP();
        OTP otp = new OTP(email,genOTP, LocalDateTime.now());
        otpRepository.save(otp);
        helper.setText(HtmlOTP.getMessageBody(genOTP,user.getName()), true);
        mailSender.send(mm);
        return true;
    }

    @Override
    public Boolean verifyOtp(String email,String otp) throws JobException {
        OTP otpEntity = otpRepository.findById(email).orElseThrow(()-> new JobException("OTP not found"));
        if(!otpEntity.getOtp().equals(otp)) {
            throw new JobException("Wrong otp");
        }
        return true;
    }

    @Override
    public ResponeDTO changePassword(LoginDTO loginDTO) throws JobException {
        User user =userRepository.findByEmail(loginDTO.getEmail()).
                orElseThrow(()-> new JobException("User not found"));
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepository.save(user);

        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setUserId(user.getId());
        notificationDTO.setMessage("Your password has been changed");
        notificationDTO.setAction("Password Changed");
        notificationService.sendNotification(notificationDTO);

        return new ResponeDTO("Change password successful.");
    }

    @Override
    public User getUserById(Long id) throws JobException {
        return userRepository.findById(id).
                orElseThrow(() -> new JobException("Not found"));
    }

    @Override
    public List<User> findAll() throws JobException {
        return this.userRepository.findAll();
    }

    @Override
    public void delete(User user) throws JobException {
        userRepository.delete(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }


    @Scheduled(fixedRate = 60000)
    public void removeExpiredOTPs() {
        LocalDateTime expiry = LocalDateTime.now().minusMinutes(10);
        List<OTP> expiredOTPs = otpRepository.findByCreationTimeBefore(expiry);
        if(!expiredOTPs.isEmpty()) {
            otpRepository.deleteAll(expiredOTPs);
        }

    }
}
