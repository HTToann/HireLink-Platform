package com.jb.dto;

import com.jb.entity.Profile;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Email is required")
    @Email(message = "Email is not valid")
    private String email;
    @NotBlank(message = "JobTitle is required")
    private String jobTitle;
    private String company;
    private String location;
    @Size(max = 1000, message = "About section cannot exceed 1000 characters")
    private String about;
    private String picture;
    @Min(value = 0, message = "Total experience must be >= 0")
    private Long totalExp;
    @NotNull(message = "Skills list must not be null")
    @Size(min = 1, message = "Please add at least one skill")
    private List<@NotBlank(message = "Skill cannot be blank") String> skills;
    private List<@Valid Experience> experiences;
    private List<@Valid Certification> certifications;
    private List<Long> savedJobs;
    public Profile toEntity() {
        return new Profile(this.id,this.name,this.email,this.jobTitle,
                this.company,this.location,this.about,
                this.picture,this.totalExp,
                this.skills,this.experiences,
                this.certifications,this.savedJobs);
    }
}
