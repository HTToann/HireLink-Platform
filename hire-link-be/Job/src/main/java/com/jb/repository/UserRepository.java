package com.jb.repository;

import com.jb.entity.User;
import com.jb.enums.AccountType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface UserRepository extends MongoRepository<User, Long> {
    public Optional<User> findByEmail(String email);
    User getUserById(Long id);
    List<User> findByIdIn(Collection<Long> ids);
    List<User> findByAccountType(AccountType accountType);
    long countByAccountType(AccountType accountType);
}
