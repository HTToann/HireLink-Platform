package com.jb.controller.api;

import com.jb.dto.ProfileDTO;
import com.jb.entity.Profile;
import com.jb.exception.JobException;
import com.jb.repository.ProfileRepository;
import com.jb.service.ProfileService;
import com.jb.service.S3.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
@Validated
public class ProfileControllerApi {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private S3Service s3Service;
    @Autowired
    private ProfileRepository profileRepository;

    @GetMapping("/profiles/get/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) throws JobException {
        return new ResponseEntity<>(profileService.getProfile(id), HttpStatus.OK);
    }
    @GetMapping("/profiles/getAll")
    public ResponseEntity<List<ProfileDTO>> getAllProfiles() throws JobException {
        return new ResponseEntity<>(profileService.getAllApplicantProfiles(), HttpStatus.OK);
    }
    @PutMapping("/profiles/update")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws JobException {
        return new ResponseEntity<>(profileService.updateProfile(profileDTO), HttpStatus.OK);
    }
    @PutMapping("/profiles/{id}/avatar")
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file,
                                               @PathVariable Long id) throws IOException, JobException {
        String key = "avatars/profile_" + id + ".jpg";
        String imageUrl = s3Service.uploadFile(file, key);
        Profile profile = profileRepository.findById(id).orElseThrow(() -> new JobException("Profile not found"));
        profile.setPicture(imageUrl);
        profileRepository.save(profile);
        return ResponseEntity.ok(imageUrl);
    }
}
