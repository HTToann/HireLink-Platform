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
public class Experience {
    @NotBlank(message = "Job title is required")
    private String title;
    @NotBlank(message = "Company name is required")
    private String company;
    private String location;
    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;
    // endDate có thể null nếu đang làm việc
    private LocalDateTime endDate;
    @NotNull(message = "Working status is required")
    private Boolean working;
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;
}