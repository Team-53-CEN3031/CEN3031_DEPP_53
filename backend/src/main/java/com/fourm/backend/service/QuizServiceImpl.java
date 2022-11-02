package com.fourm.backend.service;

import com.fourm.backend.model.QuizScore;
import com.fourm.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {
    private QuizRepository quizRepository;

    @Autowired
    public void setQuizRepository(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @Override
    public List<QuizScore> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public QuizScore saveQuiz(QuizScore quizScore) {
        return quizRepository.save(quizScore);
    }
}
