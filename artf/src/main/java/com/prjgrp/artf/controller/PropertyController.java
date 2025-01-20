package com.prjgrp.artf.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.prjgrp.artf.model.Property;
import com.prjgrp.artf.service.PropertyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@CrossOrigin
public class PropertyController {
    @Autowired
    PropertyService service;

    @GetMapping("/availableproperties")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public List<Property> getAvailableProperties() {
        return service.getAvailableProperties(true);
    }

    @GetMapping("/unavailableproperties")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public List<Property> getUnavailableProperties() {
        return service.getAvailableProperties(false);
    }

    @GetMapping("property/{id}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public Optional<Property> getProperty(@PathVariable Long id) {
        return service.getPropertyById(id);
    }
    

    @PostMapping("/property/{owner}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner')")
    public void postProperty(@PathVariable String owner,@RequestBody Property data) {
        service.addProperty(owner,data);
    }

    @GetMapping("/ownerproperties/{owner}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner')")
    public List<Property> getOwnerProperties(@PathVariable String owner) {
        return service.getPropertiesByOwner(owner);
    }

    @GetMapping("/tenantproperty/{tenant}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public Property getPropertyByTenant(@PathVariable String tenant) {
        return service.getPropertyByTenant(tenant);
    }

    @PutMapping("property/{id}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner')")
    public void putProperty(@PathVariable Long id, @RequestBody Property data) {
        service.updateProperty(id, data);
    }

    @PutMapping("removetenant/{id}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner')")
    public void deleteTenant(@PathVariable Long id) {
        service.removeTenant(id);
    }

    @GetMapping("/checktenant/{tenant}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public String getMethodName(@PathVariable String tenant) {
        return service.checkTenant(tenant);
    }
    
    
}
