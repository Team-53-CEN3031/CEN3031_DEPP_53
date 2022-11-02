package com.fourm.backend.service;

import com.fourm.backend.model.Post;

import java.util.List;

public interface PostService {


    public List<Post> getAllPosts();

    public Post savePost(Post post);
}
