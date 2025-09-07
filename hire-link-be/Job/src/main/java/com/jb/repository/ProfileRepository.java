package com.jb.repository;

import com.jb.dto.ProfileDTO;
import com.jb.entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;
import java.util.Set;


public interface ProfileRepository extends MongoRepository<Profile, Long> {
    List<Profile> findByIdIn(Collection<Long> id);
}
