package com.fourm.backend.controller;

import com.fourm.backend.model.Post;
import com.fourm.backend.model.PostPrototype;
import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.PostService;
import com.fourm.backend.service.UserService;
import com.sun.tools.jconsole.JConsoleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fourm.backend.auth.AuthController;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@CrossOrigin
public class PostController {
    private AuthController authController;

    private PostService postService;

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public PostController(AuthController authController) {
        this.authController = authController;
    }

    @Autowired
    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody PostPrototype postPrototype) {
        String posterToken = postPrototype.getPosterToken();
        if(posterToken == null) {
            return new ResponseEntity<>("Poster token is null", HttpStatus.BAD_REQUEST);
        }

        //Verify the token
        if(authController.validateJwtToken(posterToken).getStatusCode() != HttpStatus.OK){
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        Post p = new Post();
        p.setPostMessage(postPrototype.getPostMessage());
        Long[] tokenData = authController.getJwtTokenData(posterToken);
        UserPerson userPerson = null;
        List<UserPerson> userPersonList = userService.getAllUsers();
        for(UserPerson u : userPersonList) {
            if(u.getId() == tokenData[0].intValue()) {
                userPerson = u;
                break;
            }
        }

        p.setUser(userPerson);
        p.setPostTime(new java.sql.Timestamp(System.currentTimeMillis()));

        postService.savePost(p);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public List<Post> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        for(Post p : posts) {
            p.getUser().setPassword("");
        }
        return posts;
    }
}
