package com.prjgrp.artf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.prjgrp.artf.model.User;
import com.prjgrp.artf.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin
public class UserController {
    @Autowired
    UserService service;

    @GetMapping("/user")
    @PreAuthorize("hasRole('Admin')")
    public List<User> getAllUsers(){
        return service.getUsers();
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public User getByUsername(@PathVariable String username) {
        return service.getUserByUsername(username);
    }
    
    @PutMapping("user/{id}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public void updateUser(@PathVariable Long id, @RequestBody User data) {
        service.updateUser(id, data);
    }
}
