package com.fourm.backend.controller;

import com.fourm.backend.model.Post;
import com.fourm.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@CrossOrigin
public class PostController {
    private PostService postService;

    @Autowired
    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/add")
    public String add(@RequestBody Post post) {
        postService.savePost(post);
        return "New post is added";
    }

    @GetMapping("/getAll")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }
}
