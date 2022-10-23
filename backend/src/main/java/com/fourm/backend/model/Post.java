package com.fourm.backend.model;

import org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId;

    @Column(name = "poster_id")
    private int posterId;

    @Column(name = "post_time")
    private Timestamp postTime;

    @Column(name = "post_message")
    private String postMessage;

    public Post() {

    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getPosterId() {
        return posterId;
    }

    public void setPosterId(int posterId) {
        this.posterId = posterId;
    }

    public Timestamp getPostTime() {
        return postTime;
    }

    public void setPostTime(Timestamp postTime) {
        this.postTime = postTime;
    }

    public String getPostMessage() {
        return postMessage;
    }

    public void setPostMessage(String postMessage) {
        this.postMessage = postMessage;
    }
}
