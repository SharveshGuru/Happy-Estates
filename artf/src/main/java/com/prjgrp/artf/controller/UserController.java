package com.prjgrp.artf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.prjgrp.artf.model.PropertyListingsModel;
import com.prjgrp.artf.model.User;
import com.prjgrp.artf.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin
public class UserController {
    @Autowired
    UserService service;

    @GetMapping("/user")
    public List<User> getAllUsers(){
        return service.getUsers();
    }

    @GetMapping("/user/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return service.getUserByUsername(username);
    }

    @PostMapping("/user")
    public void postNewUser(@RequestBody User data) {
        service.addUser(data);
    }
    
    @PutMapping("user/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User data) {
        service.updateUser(id, data);
    }
    
}
