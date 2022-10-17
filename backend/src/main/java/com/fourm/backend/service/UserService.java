package com.fourm.backend.service;

import com.fourm.backend.model.UserPerson;

import java.util.List;

// UserService is an interface that is used to define the methods that are used to interact with the database
public interface UserService {
    //saveUser is a method that is used to save a user to the database and returns the user that was saved
    public UserPerson saveUser(UserPerson userPerson);
    //getAllUsers is a method that is used to get all the users from the database and return them as a list
    public List<UserPerson> getAllUsers();
}
