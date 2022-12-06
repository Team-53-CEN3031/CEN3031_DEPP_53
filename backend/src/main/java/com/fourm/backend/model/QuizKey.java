package com.fourm.backend.model;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

public class QuizKey implements Serializable {
    private Timestamp quizDate;

    //user_id is a foreign key
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserPerson user;

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
        return user.getId() == quizKey.user.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(quizDate, user.getId());
    }

    public Timestamp getQuizDate() {
        return quizDate;
    }

    public void setQuizDate(Timestamp quizDate) {
        this.quizDate = quizDate;
    }

    public UserPerson getUser() {
        return user;
    }

    public void setUser(UserPerson user) {
        this.user = user;
    }
}
