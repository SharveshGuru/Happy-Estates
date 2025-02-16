package com.prjgrp.artf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ArtfApplication {

	public static void main(String[] args) {
		// Dotenv dotenv=Dotenv.load();
		System.setProperty("DB_URL", System.getenv("DB_URL"));
		System.setProperty("DB_USER", System.getenv("DB_USER"));
		System.setProperty("DB_PWD", System.getenv("DB_PWD"));
		System.setProperty("FRONTEND_URL", System.getenv("FRONTEND_URL"));
		System.setProperty("JWT_SECRET", System.getenv("JWT_SECRET"));
		
		SpringApplication.run(ArtfApplication.class, args);
		
	}

}
