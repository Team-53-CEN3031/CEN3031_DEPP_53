package com.fourm.backend.model;

public class CommentPrototype {

    private String commentMessage;

    private String commenterToken;

    private int postId;

    public CommentPrototype() {

    }

    public String getCommentMessage() {
        return commentMessage;
    }

    public void setCommentMessage(String commentMessage) {
        this.commentMessage = commentMessage;
    }

    public String getCommenterToken() {
        return commenterToken;
    }

    public void setCommenterToken(String commenterToken) {
        this.commenterToken = commenterToken;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

}
