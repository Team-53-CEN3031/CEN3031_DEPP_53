package com.fourm.backend.service;

import com.fourm.backend.model.UserPerson;
import com.fourm.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
// UserServiceImpl is a class that implements the UserService interface

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    /*
    Autowired is used to inject the UserRepository into the UserServiceImpl class
    This is done by using the @Autowired annotation
    setUsersRepository is a method that is used to set the UserRepository in the UserServiceImpl class
     */
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
    Override is used to override the saveUser method in the UserService interface
    saveUser is a method that is used to save a user to the database and returns the user that was saved
    @param userPerson is the user that is being saved to the database
    @return the user that was saved to the database
     */
    @Override
    public UserPerson saveUser(UserPerson userPerson) {
        userPerson.setRole("user");
        return userRepository.save(userPerson);
    }
    /*Override is used to override the getAllUsers method in the UserService interface
    getAllUsers is a method that is used to get all the users from the database and return them as a list
    @param is empty
    @return a list of all the users in the database
     */
    @Override
    public List<UserPerson> getAllUsers() {
        return userRepository.findAll();
    }
}
