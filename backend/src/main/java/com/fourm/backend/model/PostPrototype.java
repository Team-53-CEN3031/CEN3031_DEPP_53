package com.fourm.backend.model;

public class PostPrototype {

    private String postMessage;

    private String posterToken;

    public PostPrototype() {

    }

    public String getPostMessage() {
        return postMessage;
    }

    public void setPostMessage(String postMessage) {
        this.postMessage = postMessage;
    }

    public String getPosterToken() {
        return posterToken;
    }

    public void setPosterToken(String posterToken) {
        this.posterToken = posterToken;
    }

}
