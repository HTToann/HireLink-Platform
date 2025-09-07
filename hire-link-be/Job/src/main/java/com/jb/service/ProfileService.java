package com.jb.service;

import com.jb.dto.ProfileDTO;
import com.jb.exception.JobException;

import java.util.List;

public interface ProfileService {
    public Long createProfile(String email,String name) throws JobException;
    public ProfileDTO getProfile(Long id ) throws JobException;
    public ProfileDTO updateProfile(ProfileDTO profileDTO ) throws JobException;
    public List<ProfileDTO> getAllProfiles() throws JobException;
    List<ProfileDTO> getAllApplicantProfiles() throws JobException;
}
