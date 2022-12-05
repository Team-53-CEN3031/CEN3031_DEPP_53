package com.fourm.backend.service;

import com.fourm.backend.model.Comment;

import java.util.List;

public interface CommentService {

    public List<Comment> getAllComments();

    public Comment saveComment(Comment comment);
}
