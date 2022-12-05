package com.fourm.backend.repository;

import com.fourm.backend.model.Chat;
import com.fourm.backend.model.UserPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat,Integer> {

}
