package com.prjgrp.artf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.prjgrp.artf.model.User;
import com.prjgrp.artf.repository.UserRepo;

@Component
public class CreateSuperUser implements CommandLineRunner {
    
    @Autowired
    private UserRepo repo;
    
    @Autowired
    private PasswordEncoder pwdencoder;

    @Override
    public void run(String... args) throws Exception {

        if (repo.findByUsername("admin") == null) {
            User superUser = new User();
            superUser.setName("Admin");
            superUser.setEmail("admin@gmail.com");
            superUser.setPhone("111");
            superUser.setUserType("Admin");
            superUser.setUsername("admin");
            superUser.setPassword(pwdencoder.encode("123")); 

            repo.save(superUser);
            System.out.println("Superuser created: " + superUser.getUsername());
        } else {
            System.out.println("Superuser already exists.");
        }
    }
}
