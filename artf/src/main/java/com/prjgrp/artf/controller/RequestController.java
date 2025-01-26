package com.prjgrp.artf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.prjgrp.artf.model.Request;
import com.prjgrp.artf.service.RequestService;

@RestController
@CrossOrigin
public class RequestController {
    @Autowired
    RequestService service;
    
    @GetMapping("/requestsproperty/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Tenant') or hasRole('ROLE_Admin')")
    public List<Request> getRequestsByProperty(Long id) {
        return service.getRequestsByProperty(id);
    }

    @GetMapping("/requeststenant/{username}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Tenant') or hasRole('ROLE_Admin')")
    public List<Request> getRequestsByTenant(@PathVariable String username) {
        return service.getRequestsByTenant(username);
    }

    @GetMapping("/requestsowner/{username}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<Request> getRequestsByOwner(@PathVariable String username) {
        return service.getRequestsByOwner(username);
    }

    @PostMapping("/requests")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Tenant') or hasRole('ROLE_Admin')")
    public void postRequest(@RequestBody Request entity) {
        service.addRequest(entity);
    }

    @PatchMapping("/markacknowledged/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Tenant') or hasRole('ROLE_Admin')")
    public void markAcknowledged(@PathVariable Long id){
        service.markAcknowledged(id);
    }

    @PatchMapping("/markcompleted/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Tenant') or hasRole('ROLE_Admin')")
    public void markCompleted(@PathVariable Long id){
        service.markCompleted(id);
    }
}
