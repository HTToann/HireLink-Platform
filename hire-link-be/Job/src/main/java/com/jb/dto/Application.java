package com.jb.dto;

import com.jb.enums.ApplicationStatus;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
     private Long id;
     @NotNull(message = "Applicant ID is required")
     private Long applicantId;
     // Có thể null nếu chưa hẹn phỏng vấn, nhưng nếu bạn muốn đảm bảo là ngày hợp lệ:
     @Future(message = "Interview time must be in the future")
     private LocalDateTime interviewTime;
     @NotNull(message = "Application status is required")
     private ApplicationStatus applicationStatus;
}
