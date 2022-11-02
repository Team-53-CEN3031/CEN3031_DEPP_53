package com.fourm.backend.model;

import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

public class QuizKey implements Serializable {
    private Timestamp quizDate;
    private int user_id;

    public QuizKey() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        QuizKey quizKey = (QuizKey) o;

        if (quizDate != quizKey.quizDate) {
            return false;
        }
        return user_id == quizKey.user_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(quizDate, user_id);
    }

    public Timestamp getQuizDate() {
        return quizDate;
    }

    public void setQuizDate(Timestamp quizDate) {
        this.quizDate = quizDate;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
