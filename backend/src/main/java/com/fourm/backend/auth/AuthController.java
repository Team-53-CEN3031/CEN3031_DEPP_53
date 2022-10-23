package com.fourm.backend.auth;

import com.fourm.backend.model.Login;
import com.fourm.backend.model.UserPerson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.UserService;
import com.fourm.backend.controller.UserController;

import javax.annotation.PostConstruct;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

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
    //Serial version UID is used to identify what version of the class is being used
    private static final long serialVersionUID = 1111L;

    @Value("${fourm.app.jwtSecret}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    @Value("${fourm.app.jwtExpirationMs}")
    private long tokenValidityInSeconds;

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

    @Value("${fourm.app.jwtSecret}")
    private String jwtSecret;

    @Value("${fourm.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @PostMapping("/login")
    public String login(@RequestBody Login login) {
        String email = login.getEmail();
        String password = login.getPassword();

        List<UserPerson> users = userService.getAllUsers();
        for (UserPerson user : users) {
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                //Return status code 200
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

    @PostMapping("/getJWT")
    @ResponseBody
    public String getJwtToken(@RequestBody Login login) {
        String email = login.getEmail();
        String password = login.getPassword();

        List<UserPerson> users = userService.getAllUsers();
        boolean valid = false;
        for (UserPerson user : users) {
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                //Returns null, since a user is trying to get a JWT with bad credentials
                valid = true;
                break;
            }
        }

        if(!valid){
            return null;
        }
        //Return JWT token
        Date now = new Date();
        String k = Jwts.builder().setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS256, secretKey).compact();
        System.out.println(k);
        return k;
    }

    @GetMapping("/validateJWT")
    @ResponseBody
    public String validateJwtToken(@RequestHeader("Authorization") String token) {
        //Check if token is valid
        if (token != null && token.startsWith("Bearer ")) {
            try {
                String jwt = token.substring(7);
                Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody();
                System.out.println(claims.getSubject());
                return "200";
            } catch (Exception e) {
                return "401";
            }
        }
        return "401";
    }
}
