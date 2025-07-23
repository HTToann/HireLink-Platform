package com.jb.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certification {
    @NotBlank(message = "Certification name is required")
    private String name;
    @NotBlank(message = "Issuer is required")
    private String issuer;
    @NotNull(message = "Issue date is required")
    private LocalDateTime issueDate;
    @Size(max = 100, message = "Certificate ID must be less than 100 characters")
    private String certificateId;
}
