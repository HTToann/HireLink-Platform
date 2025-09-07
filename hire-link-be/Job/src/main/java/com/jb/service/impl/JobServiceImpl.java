package com.jb.service.impl;

import com.jb.dto.ApplicantDTO;
import com.jb.dto.Application;
import com.jb.dto.JobDTO;
import com.jb.dto.NotificationDTO;
import com.jb.entity.Applicant;
import com.jb.entity.Job;
import com.jb.enums.ApplicationStatus;
import com.jb.enums.JobStatus;
import com.jb.exception.JobException;
import com.jb.repository.JobRepository;
import com.jb.service.JobService;
import com.jb.service.NotificationService;
import com.jb.utility.Ultis;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.jb.enums.JobStatus.ACTIVE;
import static com.jb.enums.JobStatus.DRAFT;
import static javax.management.remote.JMXConnectionNotification.CLOSED;

@Service("jobService")
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private NotificationService notificationService;
    @Override
    public JobDTO createJob(JobDTO jobDTO) throws JobException {
        Long id = jobDTO.getId();
        boolean isNew = (id == null || id == 0);
        if(isNew) {
            jobDTO.setId(Ultis.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());
//            jobDTO.setDescription(jobDTO.getDescription());
            sendNotification(
                    "Job Posted",
                    String.format("Job Posted Successfully for %s at %s", jobDTO.getJobTitle(), jobDTO.getCompany()),
                    jobDTO.getPostedBy(),
                    String.format("/posted-job/%d", jobDTO.getId())
            );
        }
        else {
            Job existingJob = jobRepository.findById(jobDTO.getId())
                    .orElseThrow(() -> new JobException("Job not found"));
            if (existingJob.getJobStatus() == DRAFT || existingJob.getJobStatus() == JobStatus.CLOSED) {
                jobDTO.setPostTime(LocalDateTime.now());
            }
        }

        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() throws JobException {
        return jobRepository.findAll().stream()
                .map(Job::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public JobDTO getJobById(Long id) throws JobException {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobException("Job not found"))
                .toDTO();
    }

    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobException {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobException("Job not found"));

        List<Applicant> applicants = job.getApplicants() != null ? job.getApplicants() : new ArrayList<>();

        boolean alreadyApplied = applicants.stream()
                .anyMatch(a -> Objects.equals(a.getApplicantId(), applicantDTO.getApplicantId()));

        if (alreadyApplied) {
            throw new JobException("Job already applied");
        }

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
//        Job job = jobRepository.findById(id).orElseThrow(()-> new JobException("Job not found"));
//        List<Applicant> applicants = job.getApplicants();
//        if(applicants==null)
//            applicants = new ArrayList<>();
//        if(applicants.stream().filter((x) -> x.getApplicantId()==applicantDTO.getApplicantId()).toList().size()>0) throw new JobException("Job applied already");
//        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
//        applicants.add(applicantDTO.toEntity());
//        job.setApplicants(applicants);
//        jobRepository.save(job);
    }

    @Override
    public List<JobDTO> getJobsPostedBy(Long id) throws JobException {
//        return jobRepository.findByPostedBy(id).stream().
//                map(Job::toDTO).collect(Collectors.toList());
        return jobRepository.findByPostedBy(id).stream()
                .map(Job::toDTO)
                .collect(Collectors.toList());
    }
    private void sendNotification(String action,String message,Long userId,String route) {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setAction(action);
        notificationDTO.setMessage(message);
        notificationDTO.setUserId(userId);
        notificationDTO.setRoute(route);
        try {
            notificationService.sendNotification(notificationDTO);
        } catch (JobException e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    public void changeAppliStatus(Application application) throws JobException {
        Job job = jobRepository.findById(application.getId())
                .orElseThrow(() -> new JobException("Job not found"));
        List<Applicant> updatedApplicants = job.getApplicants().stream()
                .map(applicant -> {
                    if (Objects.equals(applicant.getApplicantId(), application.getApplicantId())) {
                        applicant.setApplicationStatus(application.getApplicationStatus());

                        if (application.getApplicationStatus() == ApplicationStatus.INTERVIEWING) {
                            applicant.setInterviewTime(application.getInterviewTime());

                            sendNotification(
                                    "Interview Scheduled",
                                    String.format("Interview scheduled for job ID: %d", application.getId()),
                                    application.getApplicantId(),
                                    "/job-history"
                            );
                        }
                    }
                    return applicant;
                })
                .collect(Collectors.toList());

        job.setApplicants(updatedApplicants);
        jobRepository.save(job);
//        Job job = jobRepository.findById(application.getId()).orElseThrow(()-> new JobException("Job not found"));
//        List<Applicant> applicants = job.getApplicants().stream().map((x) -> {
//            x.setApplicationStatus(application.getApplicationStatus());
//            if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) {
//                x.setInterviewTime(application.getInterviewTime());
//
//                String message = String.format("Interview scheduled for job ID: %d", application.getId());
//                sendNotification("Interview Scheduled",
//                        message,
//                        application.getApplicantId(),
//                        "/job-history"
//                        );
//            }
//            return x;
//        }).toList();
//        job.setApplicants(applicants);
//        jobRepository.save(job);
    }

    @Override
    public void updateStatusJob(Long id,JobStatus status) throws JobException {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobException("Job not found"));
        if (status == JobStatus.DELETE) {
            jobRepository.delete(job);
        } else {
            job.setJobStatus(status);
            job.setPostTime(LocalDateTime.now());
            jobRepository.save(job);
        }
//        JobDTO job = jobRepository.findById(id).orElseThrow(()-> new JobException("Job not found")).toDTO();
//        switch (status) {
//            case DRAFT -> job.setJobStatus(JobStatus.DRAFT);
//            case CLOSED -> job.setJobStatus(JobStatus.CLOSED);
//            case ACTIVE -> job.setJobStatus(JobStatus.ACTIVE);
//        }
//        job.setPostTime(LocalDateTime.now());
//        jobRepository.save(job.toEntity());
    }

    @Override
    public void deleteJob(Long id) throws JobException {
        if (!jobRepository.existsById(id)) {
            throw new JobException("Không tìm thấy công việc với ID: " + id);
        }
        jobRepository.deleteById(id);
    }
}
