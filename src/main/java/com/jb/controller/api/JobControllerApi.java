package com.jb.controller.api;

import com.jb.dto.*;
import com.jb.enums.JobStatus;
import com.jb.exception.JobException;
import com.jb.service.JobService;
import com.jb.service.S3.S3Service;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/jobs")
@Validated
public class JobControllerApi {
    @Autowired
    private JobService jobService;
    @Autowired
    private S3Service s3Service;

@PostMapping(value = "/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<JobDTO> postJob(
        @RequestPart("job") @Valid JobDTO jobDTO,
        @RequestPart(value = "companyLogo", required = false) MultipartFile companyLogo
) throws JobException, IOException {
    if (companyLogo != null && !companyLogo.isEmpty()) {
        // Tạo key duy nhất cho ảnh trên S3
        String key = "company-logos/" + UUID.randomUUID() + "-" + companyLogo.getOriginalFilename();
        String logoUrl = s3Service.uploadFile(companyLogo, key);

        // Gán URL vào DTO
        jobDTO.setCompanyLogoUrl(logoUrl);
    }

    jobDTO = jobService.createJob(jobDTO);

    return new ResponseEntity<>(jobDTO, HttpStatus.CREATED);
}
    @GetMapping("/getAll")
    public ResponseEntity<List<JobDTO>> getAllJobs() throws JobException {
        return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<JobDTO> getJob(@PathVariable Long id) throws JobException {
        return new ResponseEntity<>(jobService.getJobById(id), HttpStatus.OK);
    }
    @PostMapping("/apply/{id}")
    public ResponseEntity<ResponeDTO> applyJob(@PathVariable Long id,
                                               @RequestBody ApplicantDTO applicantDTO)
            throws JobException {
    jobService.applyJob(id, applicantDTO);
    return new ResponseEntity<>(new ResponeDTO("Applied Successfully"), HttpStatus.OK);
    }
    @GetMapping("/postedBy/{id}")
    public ResponseEntity<List<JobDTO>> getJobsPostedBy(@PathVariable Long id) throws JobException {
        return new ResponseEntity<>(jobService.getJobsPostedBy(id), HttpStatus.OK);
    }
    @PatchMapping("/{id}/update-status")
    public ResponseEntity<ResponeDTO> updateJobStatus(@PathVariable Long id,
                                                      @RequestBody Map<String, String> body)
            throws JobException {
        JobStatus status = JobStatus.valueOf(body.get("jobStatus").toUpperCase());
        jobService.updateStatusJob(id, status);
        return new ResponseEntity<>(new ResponeDTO("Updated Successfully"), HttpStatus.OK);
    }
    @PostMapping("/changeAppStatus")
    public ResponseEntity<ResponeDTO> changeAppliStatus(@RequestBody Application application)
            throws JobException {
        jobService.changeAppliStatus(application);
        return new ResponseEntity<>(new ResponeDTO("Application Status Changed Successfully"), HttpStatus.OK);
    }
}
