package com.fourm.backend.service;

import com.fourm.backend.model.UserPerson;
import com.fourm.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserPerson saveUser(UserPerson userPerson) {
        return userRepository.save(userPerson);
    }

    @Override
    public List<UserPerson> getAllUsers() {
        return userRepository.findAll();
    }
}
