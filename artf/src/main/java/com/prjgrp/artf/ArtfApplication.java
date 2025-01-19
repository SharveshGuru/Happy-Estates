package com.prjgrp.artf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ArtfApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtfApplication.class, args);
		
	}

}
