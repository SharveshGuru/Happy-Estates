package com.prjgrp.artf.controller;

import org.springframework.web.bind.annotation.RestController;

import com.prjgrp.artf.model.PropertyListingsModel;
import com.prjgrp.artf.service.PropertyListingsService;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin
public class PropertyListingsController {

    @Autowired
    PropertyListingsService service;

    @GetMapping("/propertylistings")
    public List<PropertyListingsModel> getPropertyListings(){
        return service.getPropertyListings();
    }

    @PostMapping("/propertylistings")
    public void addPropertyListing(@RequestBody PropertyListingsModel pl) {
        service.addPropertyListing(pl);
    }
    
    
}
