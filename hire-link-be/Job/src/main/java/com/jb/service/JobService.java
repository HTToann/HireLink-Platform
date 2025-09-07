package com.jb.service;


import com.jb.dto.ApplicantDTO;
import com.jb.dto.Application;
import com.jb.dto.JobDTO;
import com.jb.enums.JobStatus;
import com.jb.exception.JobException;

import java.util.List;

public interface JobService {
    public JobDTO createJob(JobDTO jobDTO) throws JobException;
    public List<JobDTO> getAllJobs() throws JobException;
    public JobDTO getJobById(Long id) throws JobException;
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobException;
    public List<JobDTO> getJobsPostedBy(Long id) throws JobException;
    public void changeAppliStatus(Application application) throws JobException;
    public void updateStatusJob(Long id, JobStatus status) throws JobException;
    public void deleteJob(Long id) throws JobException;
}
