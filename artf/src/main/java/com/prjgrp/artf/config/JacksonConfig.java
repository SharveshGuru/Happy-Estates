package com.prjgrp.artf.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper ObjectMapper(){
        ObjectMapper obm=new ObjectMapper();
        obm.registerModule(new JavaTimeModule());
        return obm;
    }
}
