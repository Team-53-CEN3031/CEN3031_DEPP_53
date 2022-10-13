package com.fourm.backend.repository;

import com.fourm.backend.model.UserPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserPerson, Integer> {
}
