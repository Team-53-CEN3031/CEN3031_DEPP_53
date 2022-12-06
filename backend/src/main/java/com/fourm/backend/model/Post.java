package com.fourm.backend.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserPerson user;


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

    public UserPerson getUser() {
        return user;
    }

    public void setUser(UserPerson user) {
        this.user = user;
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
