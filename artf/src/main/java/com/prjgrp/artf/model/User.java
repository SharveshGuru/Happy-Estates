package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phoneNumber;

    @Column(length = 255)
    private String userType;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;
}
