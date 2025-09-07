package com.jb.repository;

import com.jb.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface JobRepository extends MongoRepository<Job, Long> {
    public List<Job> findByPostedBy(Long postedBy);
    long countByPostTimeAfter(LocalDateTime dateTime);
}
