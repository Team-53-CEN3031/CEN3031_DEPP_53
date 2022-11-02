package com.fourm.backend.service;

import com.fourm.backend.model.QuizScore;

import java.util.List;

public interface QuizService {

    public List<QuizScore> getAllQuizzes();

    public QuizScore saveQuiz(QuizScore quizScore);

}
