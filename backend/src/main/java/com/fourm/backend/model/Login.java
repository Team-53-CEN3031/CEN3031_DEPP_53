package com.fourm.backend.model;

import javax.persistence.*;
import java.sql.Timestamp;
public class Login {

    // name is the name of the user and is not unique
    private String name;

    private String email;

    private String password;

    public Login() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
