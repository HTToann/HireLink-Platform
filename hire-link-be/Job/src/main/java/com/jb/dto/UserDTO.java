package com.jb.dto;

import com.jb.entity.User;
import com.jb.enums.AccountType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
        private Long id;
        @NotBlank(message = "Name is null or blank")
        private String name;
        @Email(message = "Email is invalid")
        @NotBlank(message = "Email is null or blank")
        private String email;

        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,15}$",message ="Password is invalid")
        @NotBlank(message = "Password is null or blank")
        private String password;
        private AccountType accountType;
        private Long profileId;
        public User toEntity() {
                return new User(this.id,
                        this.name,this.email,
                        this.password,this.accountType,
                        this.profileId);
        }
}

