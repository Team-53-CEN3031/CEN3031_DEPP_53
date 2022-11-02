package com.fourm.backend.repository;

import com.fourm.backend.model.QuizKey;
import com.fourm.backend.model.QuizScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<QuizScore, QuizKey> {
}
