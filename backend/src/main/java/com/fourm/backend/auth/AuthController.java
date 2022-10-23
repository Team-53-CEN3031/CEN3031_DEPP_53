package com.fourm.backend.auth;

import com.fourm.backend.model.Login;
import com.fourm.backend.model.UserPerson;
import io.jsonwebtoken.Jwt;
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
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AuthController {
    //Serial version UID is used to identify what version of the class is being used
    private static final long serialVersionUID = 1111L;

    @Value("${fourm.app.jwtSecret}")
    private String secretKey;

    @Value("${fourm.app.jwtExpirationMs}")
    private int jwtExpirationMs;


    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
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
        UserPerson actualUser = null;
        boolean valid = false;
        for (UserPerson user : users) {
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                //Returns null, since a user is trying to get a JWT with bad credentials
                actualUser = user;
                valid = true;
                break;
            }
        }

        //User somehow attempted to get a JWT with bad credentials
        if(!valid){
            return null;
        }
        //Return JWT token with user id
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
        return createToken(Long.toString(actualUser.getId()), now, expiryDate);
    }

    @PostMapping("/validateJWT")
    @ResponseBody
    public String validateJwtToken(@RequestBody String token) {
        Long[] data = getJwtTokenData(token);
        Date d1 = new Date(data[1] * 1000L);
        Date d2 = new Date(data[2] * 1000L);
        String testToken = createToken(String.valueOf(data[0]), d1, d2);
        if(testToken.equals(token)){
            return "200";
        } else {
            return "401";
        }
    }

    public String createToken(String subject, Date issued, Date expiration) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(issued)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public Long[] getJwtTokenData(String token){
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String[] chunks = token.split("\\.");
        String payload = new String(decoder.decode(chunks[1]));
        String[] y = payload.split(",");
        for(int i = 0; i < y.length; i++){
            y[i] = y[i].replaceAll("[^0-9]", "");
        }
        Long[] data = new Long[3];
        data[0] = Long.parseLong(y[0]);
        data[1] = Long.parseLong(y[1]);
        data[2] = Long.parseLong(y[2]);
        return data;
    }

    @PostMapping("/getUsername")
    @ResponseBody
    public String getUsername(@RequestBody String token) {
        //Check if token is valid
        if(validateJwtToken(token).equals("401")){
            return null;
        }
        Long[] data = getJwtTokenData(token);
        List<UserPerson> users = userService.getAllUsers();
        for (UserPerson user : users) {
            if (user.getId() == data[0]) {
                //Returns null, since a user is trying to get a JWT with bad credentials
                return user.getName();
            }
        }
        return null;
    }
}
