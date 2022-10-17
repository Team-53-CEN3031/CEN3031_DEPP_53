package com.fourm.backend.controller;

import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
    @RestController is a marker annotation that is used to indicate that the class is a controller
    @RequestMapping is used to map the request to the method
    @CrossOrigin is used to allow cross origin requests
    UserController is a class that is used to handle the requests that are sent to the backend
 */
@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    private UserService userService;

    @Autowired
    /*
    Autowired is used to inject the UserService into the UserController class
    This is done by using the @Autowired annotation
    setUserService is a method that is used to set the UserService in the UserController class
     */
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
    /*
    @PostMapping is used to map the request to the method
    @RequestBody is used to map the request body to the method
    addUser is a method that is used to add a user to the database
    @param userPerson is the user that is being added to the database
    @return the user that was added to the database
     */
    @PostMapping("/add")
    public String add(@RequestBody UserPerson userPerson) {
        userService.saveUser(userPerson);
        return "New user is added";
    }
    /*
    @GetMapping is used to map the request to the method
    getAllUsers is a method that is used to get all the users from the database
    @param is empty
    @return a list of all the users in the database
     */
    @GetMapping("/getAll")
    public List<UserPerson> getAllUsers() {
        return userService.getAllUsers();
    }
}
