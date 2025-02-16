package com.prjgrp.artf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableScheduling
public class ArtfApplication {

	public static void main(String[] args) {
		Dotenv dotenv=Dotenv.load();
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USER", dotenv.get("DB_USER"));
        System.setProperty("DB_PWD", dotenv.get("DB_PWD"));
		System.setProperty("FRONTEND_URL", dotenv.get("FRONTEND_URL"));
		
		SpringApplication.run(ArtfApplication.class, args);
		
	}

}
