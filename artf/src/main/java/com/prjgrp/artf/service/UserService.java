package com.prjgrp.artf.service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.User;
import com.prjgrp.artf.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    UserRepo repo;

    public List<User> getUsers(){
        return repo.findAll();
    }

    public void addUser(User data){
        repo.save(data);
    }

    public void updateUser(Long id, User updatedUser) {
        Optional<User> existingUserOptional = repo.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            if (updatedUser.getName() != null) {
                existingUser.setName(updatedUser.getName());
            }
            if (updatedUser.getEmail() != null) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getPhone() != null) {
                existingUser.setPhone(updatedUser.getPhone());
            }
            if (updatedUser.getUserType() != null) {
                existingUser.setUserType(updatedUser.getUserType());
            }
            if (updatedUser.getUsername() != null) {
                existingUser.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getPassword() != null) {
                existingUser.setPassword(updatedUser.getPassword());
            }

            repo.save(existingUser);
        } else {
            throw new NoSuchElementException("User not found with id " + id);
        }
    }

    public User getUserByUsername(String username){
        return repo.findByUsername(username);
    }

}
