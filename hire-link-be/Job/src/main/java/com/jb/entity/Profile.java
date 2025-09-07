package com.jb.entity;

import com.jb.dto.Certification;
import com.jb.dto.Experience;
import com.jb.dto.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class Profile {
    @Id
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private String picture;
    private Long totalExp;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
    private List<Long> savedJobs;

    public ProfileDTO toDTO() {
        return new ProfileDTO(this.id,this.name,this.email,this.jobTitle,
                this.company,this.location,this.about,
                this.picture, this.totalExp,
                this.skills,this.experiences,
                this.certifications,this.savedJobs);
    }
}
