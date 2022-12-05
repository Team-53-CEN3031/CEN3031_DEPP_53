package com.fourm.backend.model;

import javax.persistence.*;
import java.sql.Timestamp;


//Comments go under posts, and are associated with a user and a particular post
//Since Posts and Comments are associated, they both are under the same controller for simplicity
//So any api calls to /comment will be handled by the PostController [/api/post] and [/api/comment] are the same
@Entity
public class Comment {
    //Auto generated id for the comment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    //The ID of the person who made the comment
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserPerson user;

    //The ID of the post that the comment is under
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "comment_time")
    private Timestamp commentTime;

    @Column(name = "comment_message")
    private String commentMessage;

    public Comment() {

    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public UserPerson getUser() {
        return user;
    }

    public void setUser(UserPerson user) {
        this.user = user;
    }

    public Timestamp getCommentTime() {
        return commentTime;
    }

    public void setCommentTime(Timestamp commentTime) {
        this.commentTime = commentTime;
    }

    public String getCommentMessage() {
        return commentMessage;
    }

    public void setCommentMessage(String commentMessage) {
        this.commentMessage = commentMessage;
    }
}
