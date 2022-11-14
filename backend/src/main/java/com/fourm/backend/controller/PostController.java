package com.fourm.backend.controller;

import com.fourm.backend.model.*;
import com.fourm.backend.service.CommentService;
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

    private CommentService commentService;

    @Autowired
    public void setCommentService(CommentService commentService) {
        this.commentService = commentService;
    }

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
        UserPerson userPerson = authController.getUserFromToken(posterToken);

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

    @GetMapping("/getPostsFrom/{id}")
    public List<Post> getUser(@PathVariable("id") int id) {
        List<Post> posts = postService.getAllPosts();
        List<Post> results = new java.util.ArrayList<>();
        for(Post p : posts) {
            if(p.getUser().getId() == id) {
                results.add(p);
            }
        }
        return results;
    }

    @GetMapping("/getPost/{id}")
    public Post getPost(@PathVariable("id") int id) {
        List<Post> posts = postService.getAllPosts();
        for(Post p : posts) {
            if(p.getPostId() == id) {
                return p;
            }
        }
        return null;
    }

    @PostMapping("/postComment/{id}")
    public ResponseEntity<?> postComment(@PathVariable String id,@RequestBody CommentPrototype commentPrototype) {
        //Try to convert the id to an int
        int postId;
        try {
            postId = Integer.parseInt(id);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>("Invalid post id", HttpStatus.BAD_REQUEST);
        }

        //Check if the commenter token is null
        String commenterToken = commentPrototype.getCommenterToken();
        if(commenterToken == null) {
            return new ResponseEntity<>("Commenter token is null", HttpStatus.BAD_REQUEST);
        }

        //Verify the token
        if(authController.validateJwtToken(commenterToken).getStatusCode() != HttpStatus.OK){
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }


        String commentMessage = commentPrototype.getCommentMessage();
        if(commentMessage == null) {
            return new ResponseEntity<>("Comment message is null", HttpStatus.BAD_REQUEST);
        }
        if(commentMessage.length() > 1000) {
            return new ResponseEntity<>("Comment message is too long", HttpStatus.BAD_REQUEST);
        }
        if(commentMessage.length() < 1) {
            return new ResponseEntity<>("Comment message is too short", HttpStatus.BAD_REQUEST);
        }

        //Get the commenter
        UserPerson commenter = authController.getUserFromToken(commenterToken);
        if(commenter == null) {
            return new ResponseEntity<>("Commenter does not exist", HttpStatus.BAD_REQUEST);
        }

        //Check if the post exists
        Post post = getPost(postId);
        if(post == null) {
            return new ResponseEntity<>("Post does not exist", HttpStatus.BAD_REQUEST);
        }

        //Create the comment
        Comment comment = new Comment();
        comment.setCommentMessage(commentMessage);
        comment.setCommentTime(new java.sql.Timestamp(System.currentTimeMillis()));
        comment.setPost(post);
        comment.setUser(commenter);
        commentService.saveComment(comment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getAllComments")
    public List<Comment> getAllComments() {
        List<Comment> c = commentService.getAllComments();
        for(Comment comment : c) {
            comment.getUser().setPassword("");
        }
        return c;
    }

    @GetMapping("/getCommentsOf/{id}")
    public List<Comment> getCommentsOf(@PathVariable("id") int id) {
        //Get all comments of a particular post
        List<Comment> comments = commentService.getAllComments();
        List<Comment> results = new java.util.ArrayList<>();
        for(Comment c : comments) {
            if(c.getPost().getPostId() == id) {
                results.add(c);
            }
        }
        return results;
    }
}
