package com.fourm.backend.service;

import com.fourm.backend.model.UserPerson;

import java.util.List;

public interface UserService {
    public UserPerson saveUser(UserPerson userPerson);
    public List<UserPerson> getAllUsers();
}
