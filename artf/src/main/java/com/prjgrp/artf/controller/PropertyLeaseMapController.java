package com.prjgrp.artf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prjgrp.artf.model.PropertyLeaseMap;
import com.prjgrp.artf.service.PropertyLeaseMapService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@CrossOrigin
public class PropertyLeaseMapController {
    @Autowired
    PropertyLeaseMapService service;

    @GetMapping("/plmap")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<PropertyLeaseMap> getAll() {
        return service.getMaps();
    }

    @GetMapping("/plmap/{owner}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<PropertyLeaseMap> getMapByOwner(@PathVariable String username) {
        return service.getMapByOwner(username);
    }

    @GetMapping("/activeleases/{owner}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<PropertyLeaseMap> getActiveLeases(@PathVariable String owner) {
        return service.getActiveLeasesByOwner(owner);
    }

    @GetMapping("/plmapprop/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin') or hasRole('ROLE_Tenant')")
    public PropertyLeaseMap getMapByProperty(@PathVariable Long id) {
        return service.getMapByProperty(id);
    }

    @PostMapping("/plmap")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public void postMap(@RequestBody PropertyLeaseMap entity) {
        service.addMap(entity);
    }
    
    @PutMapping("/plmap/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public void removeMap(@PathVariable Long id) {
        service.deleteByProperty(id);
    }

    @DeleteMapping("/plmap/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public void deleteMap(@PathVariable Long id) {
        service.deleteByProperty(id);
    }
}
