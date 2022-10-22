package com.fourm.backend.controller;

import com.fourm.backend.model.Login;
import com.fourm.backend.model.UserPerson;
import org.springframework.web.bind.annotation.*;
import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.UserService;
import com.fourm.backend.controller.UserController;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/*
    @RestController is a marker annotation that is used to indicate that the class is a controller
    @RequestMapping is used to map the request to the method
    @CrossOrigin is used to allow cross origin requests
    AuthController is a class that is used to handle auth requests that are sent to the backend
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private UserService userService;
    @PostMapping("/login")
    public String login(@RequestBody Login login) {
        String email = login.getEmail();
        String password = login.getPassword();

        List<UserPerson> users = userService.getAllUsers();
        for (UserPerson user : users) {
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                //Return status code 200
                System.out.println(user.getId());
                return "200";
            }
        }
        //Return status code 401
        return "401";
    }

    @PostMapping("/register")
    public String register(@RequestBody Login login) {
        String email = login.getEmail();
        String password = login.getPassword();
        String name = login.getName();

        //Check if email is already in use
        List<UserPerson> users = userService.getAllUsers();
        for (UserPerson user : users) {
            if (user.getEmail().equals(email)) {
                //Return status code 401
                return "401";
            }
        }
        UserPerson user = new UserPerson();
        user.setName(login.getName());
        user.setEmail(login.getEmail());
        user.setPassword(login.getPassword());

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
        String DateToStoreInDataBase= sdf.format(new Date()); // java.util.Date
        Timestamp ts = Timestamp.valueOf(DateToStoreInDataBase); // java.sql.Timestamp
        user.setRegistrationDate(ts);

        userService.saveUser(user);
        return "200";

    }

}
