package com.jb.dto;

import com.jb.entity.Applicant;
import com.jb.enums.ApplicationStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicantDTO {
    private Long applicantId;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Email is required")
    @Email(message = "Email is not valid")
    private String email;

    @NotNull(message = "Phone number is required")
    @Digits(integer = 15, fraction = 0, message = "Phone number must be numeric")
    private Long phone;

    @Size(max = 255, message = "Website must be under 255 characters")
    @Pattern(regexp = "^(https?://)?[\\w.-]+(?:\\.[\\w.-]+)+[/#?]?.*$", message = "Website URL is invalid")
    private String website;
    private String resume; // Đã encode Base64, nên chỉ validate trong xử lý custom nếu cần
    @Size(max = 1000, message = "Cover letter must be less than 1000 characters")
    private String coverLetter;
    @NotNull(message = "Timestamp is required")
    private LocalDateTime timestamp;
    @NotNull(message = "Application status is required")
    private ApplicationStatus applicationStatus;
    @Future(message = "Interview time must be in the future")
    private LocalDateTime interviewTime;
    public Applicant toEntity() {
        return new Applicant(this.applicantId,this.name,this.email,
                this.phone,this.website,
                this.resume!=null? Base64.getDecoder().decode(this.resume):null
                ,this.coverLetter,this.timestamp,this.applicationStatus,this.interviewTime);
    }
}
