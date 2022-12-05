package com.fourm.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fourm.backend.auth.AuthController;
import com.fourm.backend.model.Block;
import com.fourm.backend.model.Chat;
import com.fourm.backend.model.ChatPrototype;
import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.BlockService;
import com.fourm.backend.service.ChatService;
import com.fourm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
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

    private BlockService blockService;

    @Autowired
    public void setBlockService(BlockService blockService) {
        this.blockService = blockService;
    }

    private AuthController authController;

    @Autowired
    public UserController(AuthController authController) {
        this.authController = authController;
    }

    /*
    @GetMapping is used to map the request to the method
    getAllUsers is a method that is used to get all the users from the database
    @param is empty
    @return a list of all the users in the database
     */

    private ChatService chatService;

    @Autowired
    public void setChatService(ChatService chatService) {
        this.chatService = chatService;
    }


    @GetMapping("/getAll")
    public List<UserPerson> getAllUsers() {
        List<UserPerson> x = userService.getAllUsers();
        for(UserPerson userPerson : x){
            userPerson.setPassword("");
        }
        return x;
    }

    @GetMapping("/get/{id}")
    public UserPerson getUser(@PathVariable("id") int id) {
        UserPerson userPerson = userService.getUser(id);
        if(userPerson != null){
            userPerson.setPassword("");
            return userPerson;
        } else {
            UserPerson unknownUser = new UserPerson();
            unknownUser.setName("Unknown");
            unknownUser.setId(-1);
            return unknownUser;
        }
    }

    @PostMapping("/block/{id}")
    public ResponseEntity<?> blockUser(@PathVariable("id") String id, @RequestBody String userToken) {
        //remove the quotes from the string
        userToken = userToken.substring(1, userToken.length() - 1);
        //Try to parse id to int
        int blockedId;
        try {
            blockedId = Integer.parseInt(id);
        } catch (NumberFormatException e) {
            //Return bad request if id is not an int
            return new ResponseEntity<>("Invalid id", HttpStatus.BAD_REQUEST);
        }
        //Check if userToken is valid
        if (authController.validateJwtToken(userToken).getStatusCode() != HttpStatus.OK) {
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }
        //Get the user id from the token
        Long[] data = authController.getJwtTokenData(userToken);
        if(data == null){
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }

        //check to see if it already blocked
        List<Block> blocks = blockService.getAllBlocks();
        for(Block block : blocks){
            if((block.getBlocker().getId() == data[0]) && (block.getBlocked().getId() == blockedId)){
                return new ResponseEntity<>("Already blocked", HttpStatus.BAD_REQUEST);
            }
        }

        //block user if not blocked
        UserPerson blocker = userService.getUser(data[0].intValue());
        UserPerson blocked = userService.getUser(blockedId);
        Block block = new Block(blocker,blocked);
        blockService.saveBlock(block);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/unblock/{id}")
    public ResponseEntity<?> unblockUser(@PathVariable("id") String id, @RequestBody String userToken) {
        //remove the quotes from the string
        userToken = userToken.substring(1, userToken.length() - 1);
        //Try to parse id to int
        int blockedId;
        try {
            blockedId = Integer.parseInt(id);
        } catch (NumberFormatException e) {
            //Return bad request if id is not an int
            return new ResponseEntity<>("Invalid id", HttpStatus.BAD_REQUEST);
        }
        //Check if userToken is valid
        if (authController.validateJwtToken(userToken).getStatusCode() != HttpStatus.OK) {
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }
        //Get the user id from the token
        Long[] data = authController.getJwtTokenData(userToken);
        if(data == null){
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }

        //check to see if block exists
        List<Block> blocks = blockService.getAllBlocks();
        for(Block block : blocks){
            if((block.getBlocker().getId() == data[0]) && (block.getBlocked().getId() == blockedId)){
                blockService.deleteBlock(block);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        //User somehow tried to unblock someone that they didn't block in the first place
        return new ResponseEntity<>("Not blocked", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/getChat")
    public List<Chat> getChat(@RequestBody String userToken) {
        //remove the quotes from the string
        userToken = userToken.substring(1, userToken.length() - 1);
        //Check if userToken is valid
        if (authController.validateJwtToken(userToken).getStatusCode() != HttpStatus.OK) {
            return null;
        }
        //Get the user id from the token
        Long[] data = authController.getJwtTokenData(userToken);
        if(data == null){
            return null;
        }
        int userId = data[0].intValue();
        List<Chat> chats = chatService.getAllChats();
        //Make empty list<Chat> to return
        List<Chat> userChats = new ArrayList<>();
        for(Chat chat : chats){
            if(chat.getSender().getId() == userId || chat.getReceiver().getId() == userId){
                userChats.add(chat);
            }
        }
        return userChats;
    }

    @PostMapping("/sendChat")
    public ResponseEntity<?> sendChat(@RequestBody ChatPrototype chatPrototype) {
        //Check if receiver exists [this is probably the most expensive operation]
        if(userService.getUser(chatPrototype.getReceiverId()) == null){
            return new ResponseEntity<>("Invalid receiver", HttpStatus.BAD_REQUEST);
        }

        //Check if userToken is valid
        if (authController.validateJwtToken(chatPrototype.getUserToken()).getStatusCode() != HttpStatus.OK) {
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }

        //Check for empty message
        if(chatPrototype.getChatMessage().equals("")){
            return new ResponseEntity<>("Empty message", HttpStatus.BAD_REQUEST);
        }

        //Get the user id from the token
        Long[] data = authController.getJwtTokenData(chatPrototype.getUserToken());
        if(data == null){
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }
        int userId = data[0].intValue();

        //Check if user is blocked
        List<Block> blocks = blockService.getAllBlocks();
        for(Block block : blocks){
            if((block.getBlocker().getId() == chatPrototype.getReceiverId()) && (block.getBlocked().getId() == userId)){
                return new ResponseEntity<>("User is blocked", HttpStatus.BAD_REQUEST);
            }
        }

        //Send chat
        UserPerson sender = userService.getUser(userId);
        UserPerson receiver = userService.getUser(chatPrototype.getReceiverId());
        Chat chat = new Chat(sender,receiver,chatPrototype.getChatMessage());
        chatService.saveChat(chat);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
