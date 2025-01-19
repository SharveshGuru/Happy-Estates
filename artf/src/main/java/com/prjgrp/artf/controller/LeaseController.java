package com.prjgrp.artf.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.prjgrp.artf.model.Lease;
import com.prjgrp.artf.service.LeaseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@CrossOrigin
public class LeaseController {
    @Autowired
    LeaseService service;

    @GetMapping("/lease")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<Lease> getAllLease() {
        return service.getAllLeases();
    }

    @GetMapping("/lease/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public Optional<Lease> getLeaseById(@PathVariable Long id) {
        return service.getLeaseById(id);
    }

    @GetMapping("/approvedlease")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<Lease> getApprovedLease() {
        return service.getApprovedLease();
    }

    @GetMapping("/rejectedlease")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<Lease> getRejectedLease() {
        return service.getRejectedLease();
    }

    @GetMapping("/pendinglease")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<Lease> getPendingLease() {
        return service.getPendingLease();
    }

    @GetMapping("/pendinglease/{username}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<Lease> getPendingLeaseByOwner(@PathVariable String username) {
        return service.getPendingLease(username);
    }

    @GetMapping("/pendinglease/{username}/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public List<Lease> getPendingLeaseByOwnerAndProperty(@PathVariable String username, @PathVariable Long id) {
        return service.getPendingLease(username,id);
    }
    
    @PostMapping("/lease")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Tenant') or hasRole('ROLE_Admin')")
    public void postLease(@RequestBody Lease entity) {
        service.addLease(entity);
    }

    @PutMapping("/lease/{id}")
    @PreAuthorize("hasRole('ROLE_Owner') or hasRole('ROLE_Admin')")
    public void putLease(@PathVariable Long id, @RequestBody Lease entity) {
        service.updateLease(id, entity);
    }
    
}
