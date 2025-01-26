package com.prjgrp.artf.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.Request;
import com.prjgrp.artf.model.User;
import com.prjgrp.artf.repository.RequestRepo;

@Service
public class RequestService {
    @Autowired
    RequestRepo repo;
    @Autowired
    UserService userservice;
    @Autowired
    PropertyService propertyservice;

    public void addRequest(Request data) {
        User madeby=userservice.getUserByUsername(data.getRequestMadeBy().getUsername());
        data.setRequestMadeBy(madeby);
        repo.save(data);
    }

    public List<Request> getRequestsByProperty(Long id){
        return repo.findByLeasePropertyId(id);
    }

    public List<Request> getRequestsByTenant(String username){
        return repo.findByLeaseTenantUsername(username);
    }

    public List<Request> getRequestsByOwner(String username){
        return repo.findByLeaseOwnerUsername(username);
    }

    public void markCompleted(Long id){
        Optional<Request> optional=repo.findById(id);
        if(optional.isPresent()){
            Request data=optional.get();
            data.setStatus("Completed");
            repo.save(data);
        }
    }

    public void markAcknowledged(Long id){
        Optional<Request> optional=repo.findById(id);
        if(optional.isPresent()){
            Request data=optional.get();
            data.setStatus("Acknowledged");
            repo.save(data);
        }
    }
}
