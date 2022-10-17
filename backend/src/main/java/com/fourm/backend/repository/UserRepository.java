package com.fourm.backend.repository;

import com.fourm.backend.model.UserPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// This interface is used to interact with the database
// Repository is a marker interface that is used to indicate that the interface is a repository

@Repository
public interface UserRepository extends JpaRepository<UserPerson, Integer> {
}
