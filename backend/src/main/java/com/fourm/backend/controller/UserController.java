package com.fourm.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fourm.backend.model.Login;
import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

/*
    @RestController is a marker annotation that is used to indicate that the class is a controller
    @RequestMapping is used to map the request to the method
    @CrossOrigin is used to allow cross origin requests
    UserController is a class that is used to handle the requests that are sent to the backend
 */
@RestController
@RequestMapping("/api/user")
//Cross original to allow requests from the all origins
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {
    //Temporary web security configuration, will be changed later
    //Once we get the frontend working
    @EnableWebSecurity
    public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.cors().and().csrf().disable();
        }
    }
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
