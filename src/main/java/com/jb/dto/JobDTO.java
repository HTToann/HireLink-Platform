package com.jb.dto;

import com.jb.entity.Job;
import com.jb.enums.JobStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {
    private Long id; // Cho phép null khi tạo mới
    @NotBlank(message = "Job title is required")
    private String jobTitle;
    @NotBlank(message = "Company name is required")
    private String company;
    private String companyLogoUrl;
    @Valid
    private List<ApplicantDTO> applicants;
    @Size(max = 1000, message = "About section cannot exceed 1000 characters")
    private String about;
    @NotBlank(message = "Experience name is required")
    private String experience;
    @NotBlank(message = "JobType is required")
    private String jobType;
    @NotBlank(message = "Location is required")
    private String location;
    @Positive(message = "Package offered must be greater than 0")
    private Double packageOffered;
    private LocalDateTime postTime;
    @NotBlank(message = "Job description is required")
    private String description;
    @NotNull(message = "Skills required must not be null")
    @Size(min = 1, message = "Please provide at least one skill")
    private List<@NotBlank(message = "Skill cannot be blank") String> skillsRequired;
    @NotNull(message = "Job status is required")
    private JobStatus jobStatus;
    @NotNull(message = "PostedBy user ID is required")
    private Long postedBy;
    public Job toEntity() {
        return new Job(this.id,this.jobTitle,this.company,this.companyLogoUrl,
                this.applicants!=null?this.applicants.stream().map((x) ->x.toEntity()).toList():null,
        this.about,this.experience,this.jobType,this.location,this.packageOffered,this.postTime,
                this.description,this.skillsRequired,this.jobStatus,this.postedBy);
    }

}
