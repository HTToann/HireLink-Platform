package com.jb.utility;

import com.jb.exception.JobException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> generalExcception(Exception ex){
        System.out.println(">>> ex.getMessage(): " + ex.getMessage());
        System.out.println(">>> ex.toString(): " + ex.toString());
        ErrorInfo errorInfo = new ErrorInfo(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(JobException.class)
    public ResponseEntity<ErrorInfo> generalExcception(JobException ex){
        System.out.println(">>> ex.getMessage(): " + ex.getMessage());
        System.out.println(">>> ex.toString(): " + ex.toString());
        ErrorInfo errorInfo = new ErrorInfo(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorInfo> handleBadCredentials(BadCredentialsException ex) {
        ErrorInfo errorInfo = new ErrorInfo("Invalid email or password", 401, LocalDateTime.now());
        return new ResponseEntity<>(errorInfo, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ErrorInfo> handleDuplicateKey(DuplicateKeyException ex) {
        ErrorInfo errorInfo = new ErrorInfo("Email already exists", HttpStatus.CONFLICT.value(), LocalDateTime.now());
        return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public ResponseEntity<ErrorInfo> validationExcception(Exception ex){
        String msg="";
        if(ex instanceof MethodArgumentNotValidException manvException){
            msg=manvException.getAllErrors().stream().
                    map(ObjectError::getDefaultMessage).collect(Collectors.joining(","));
        }
        else {
            ConstraintViolationException cvException = (ConstraintViolationException)ex;
            msg=cvException.getConstraintViolations().stream().
                    map((ConstraintViolation::getMessage)).collect(Collectors.joining(","));
        }
        ErrorInfo error = new ErrorInfo(msg, HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<ErrorInfo> handleAuthWrap(InternalAuthenticationServiceException ex) {
        System.out.println(">>> ex.getMessage(): " + ex.getMessage());
        System.out.println(">>> ex.toString(): " + ex.toString());
        System.out.println(">>> ex.getCause(): " + ex.getCause());
        System.out.println(">>> ex.getCause().getClass(): " + ex.getCause().getClass());
        System.out.println(">>> ex.getCause().getMessage(): " + ex.getCause().getMessage());

        String rawMessage = ex.getCause() != null ? ex.getCause().getMessage() : ex.getMessage();
        String message = extractMessageSafely(rawMessage);

        return new ResponseEntity<>(
                new ErrorInfo(message, 401, LocalDateTime.now()),
                HttpStatus.UNAUTHORIZED
        );
    }

    // Sửa lại extractMessageSafely để nhận raw string
    private String extractMessageSafely(String raw) {
        if (raw != null && raw.contains(":")) {
            return raw.substring(raw.indexOf(":") + 1).trim(); // "User not found"
        }
        return raw != null ? raw : "Unknown error";
    }

}
