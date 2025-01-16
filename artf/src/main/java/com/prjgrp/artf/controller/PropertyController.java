package com.prjgrp.artf.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.prjgrp.artf.model.Property;
import com.prjgrp.artf.service.PropertyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@CrossOrigin
public class PropertyController {
    @Autowired
    PropertyService service;

    @GetMapping("/availableproperties")
    public List<Property> getAvailableProperties() {
        return service.getAvailableProperties(true);
    }

    @GetMapping("property/{id}")
    public Optional<Property> getProperty(@PathVariable Long id) {
        return service.getPropertyById(id);
    }
    

    @PostMapping("/property/{owner}")
    public void postProperty(@PathVariable String owner,@RequestBody Property data) {
        service.addProperty(owner,data);
    }

    @GetMapping("/ownerproperties/{owner}")
    public List<Property> getOwnerProperties(@PathVariable String owner) {
        return service.getPropertiesByOwner(owner);
    }

    @GetMapping("/tenantproperty/{tenant}")
    public Property getPropertyByTenant(@PathVariable String tenant) {
        return service.getPropertyByTenant(tenant);
    }

    @PutMapping("property/{id}")
    public void putProperty(@PathVariable Long id, @RequestBody Property data) {
        service.updateProperty(id, data);
    }
    
}
