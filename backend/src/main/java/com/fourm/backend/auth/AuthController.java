package com.fourm.backend.auth;

import com.fourm.backend.model.Login;
import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Base64;
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
        //Base64 is used to encode the secret key
        //This is done to make sure that the secret key is not stored in plain text
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

        //Create new user based on the information provided
        UserPerson user = new UserPerson();
        user.setName(login.getName());
        user.setEmail(login.getEmail());
        user.setPassword(login.getPassword());

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
        String DateToStoreInDataBase= sdf.format(new Date());
        Timestamp ts = Timestamp.valueOf(DateToStoreInDataBase);
        user.setRegistrationDate(ts);

        userService.saveUser(user);
        return "200";

    }

    @PostMapping("/getJWT")
    @ResponseBody
    public String getJwtToken(@RequestBody Login login) {
        //Check if email and password are correct
        //This is already done in the login method but it is done again
        //to verify that the credentials are correct
        String email = login.getEmail();
        String password = login.getPassword();

        //Finds the user with the given email
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


    /*
    validateJwtToken is a method that is used to validate a JWT token
    @param authToken is a String that is used to represent the JWT token
    @return String that is a confirmation that the token is valid
    returns 200 if the token is valid
    returns 401 if the token is invalid
     */
    @PostMapping("/validateJWT")
    @ResponseBody
    public String validateJwtToken(@RequestBody String token) {
        Long[] data = getJwtTokenData(token);
        //Create a new date object (issued at)
        Date d1 = new Date(data[1] * 1000L);
        //Create a new date object (expiry date)
        Date d2 = new Date(data[2] * 1000L);
        //Create a token with the data from the JWT
        String testToken = createToken(String.valueOf(data[0]), d1, d2);

        //Checks if the token is valid
        //There's a chance that the token is valid, but the user is not in the database
        //This is because the user could have been deleted from the database
        //TODO: Check if the user is in the database

        //There's almost definitely a vulnerability here, but I'm not sure what it is
        //-Zachary
        if(testToken.equals(token)){
            return "200";
        } else {
            return "401";
        }
    }

    public String createToken(String subject, Date issued, Date expiration) {
        //Crates a JWT (JSON Web Token) with the given subject, issued date, and expiration date
        //subject is the user id
        //issued is the date the token was issued
        //expiration is the date the token expires
        //Not really sure how this works, but it works
        //The signature is created using the secret key (in our properties file) and the algorithm HS512 (not sure what this is either)
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(issued)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public Long[] getJwtTokenData(String token){
        //Decoder for JWT token
        //Base64 means that the token is encoded in base64
        Base64.Decoder decoder = Base64.getUrlDecoder();
        /*
        Split the token into 3 parts: header, payload, signature
        Header is the first part of the token, and is the same for all tokens
        Payload is the second part of the token, and contains the data that we want
        Payload contains the user id, the issue date, and the expiration date
        Signature is the third part of the token, and is used to verify that the token is valid
        Signature is created by using the header, payload, and a secret key to create a hash
        Which verifies that the token is valid
        */
        String[] chunks = token.split("\\.");
        //Split the token into 3 parts based on the "." character
        String payload = new String(decoder.decode(chunks[1]));
        //Decode the payload from base64
        String[] y = payload.split(",");
        //Split the payload's data into an array that contains the user id, issue date, and expiration date
        for(int i = 0; i < y.length; i++){
            y[i] = y[i].replaceAll("[^0-9]", "");
            //Replace all non-numeric characters with nothing
        }
        //Create a new array that contains the user id, issue date, and expiration date
        Long[] data = new Long[3];
        //Data[0] is the user id
        //Data[1] is the issue date
        //Data[2] is the expiration date
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
        //Get user id from token

        List<UserPerson> users = userService.getAllUsers();
        //Iterate through all users to find the user with the id that is in the token
        for (UserPerson user : users) {
            if (user.getId() == data[0]) {
                //Return the name of the user
                return user.getName();
            }
        }
        //Returns null, since a user is trying to get a JWT with bad credentials
        return null;
    }
}
