package com.jb.service.impl;

import com.jb.dto.ProfileDTO;
import com.jb.entity.Profile;
import com.jb.entity.User;
import com.jb.enums.AccountType;
import com.jb.exception.JobException;
import com.jb.repository.ProfileRepository;
import com.jb.repository.UserRepository;
import com.jb.service.ProfileService;
import com.jb.utility.Ultis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Long createProfile(String email,String name) throws JobException {
        Profile profile = new Profile();
        profile.setId(Ultis.getNextSequence("profiles"));
        profile.setEmail(email);
        profile.setName(name);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobException {
        return profileRepository.findById(id).
                orElseThrow(() -> new JobException("Profile not found")).toDTO();
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobException {
        profileRepository.findById(profileDTO.getId()).
                orElseThrow(() -> new JobException("Profile not found"));
        profileRepository.save(profileDTO.toEntity());
        return profileDTO;
    }

    @Override
    public List<ProfileDTO> getAllProfiles() throws JobException {
        return profileRepository.findAll().stream().map((x)->x.toDTO()).collect(Collectors.toList());
    }

    @Override
    public List<ProfileDTO> getAllApplicantProfiles() throws JobException {
        // B1: Lấy tất cả User có role Applicant
        List<User> applicants = userRepository.findByAccountType(AccountType.APPLICANT);

        // B2: Lấy các profileId từ danh sách user
        List<Long> profileIds = applicants.stream()
                .map(User::getProfileId)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        // B3: Lấy các Profile tương ứng
        List<Profile> profiles = profileRepository.findAllById(profileIds);

        // B4: Convert sang DTO
        return profiles.stream()
                .map(Profile::toDTO)
                .collect(Collectors.toList());
    }
}
