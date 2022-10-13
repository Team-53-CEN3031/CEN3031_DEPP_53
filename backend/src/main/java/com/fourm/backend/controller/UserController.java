package com.fourm.backend.controller;

import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public String add(@RequestBody UserPerson userPerson) {
        userService.saveUser(userPerson);
        return "New user is added";
    }

    @GetMapping("/getAll")
    public List<UserPerson> getAllUsers() {
        return userService.getAllUsers();
    }
}
