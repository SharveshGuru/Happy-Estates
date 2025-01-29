package com.prjgrp.artf.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.Lease;
import com.prjgrp.artf.repository.LeaseRepo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class LeaseService {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    LeaseRepo repo;

    public List<Lease> getAllLeases(){
        return repo.findAll();
    }

    public Optional<Lease> getLeaseById(Long id){
        return repo.findById(id);
    }

    @Transactional
    public void addLease(Lease data){
        if (data.getOwner() != null && data.getOwner().getId() != null) {
            data.setOwner(entityManager.merge(data.getOwner()));  // Merge the owner User entity
        }
        if (data.getTenant() != null && data.getTenant().getId() != null) {
            data.setTenant(entityManager.merge(data.getTenant()));  // Merge the tenant User entity
        }

        repo.save(data);
    }

    public List<Lease> getApprovedLease(){
        return repo.findByApproved(true);
    }

    public List<Lease> getRejectedLease(){
        return repo.findByRejected(true);
    }

    public List<Lease> getPendingLease(){
        return repo.findByApprovedFalseAndRejectedFalse();
    }

    public List<Lease> getPendingLease(String username){
        return repo.findByOwnerUsernameAndApprovedFalseAndRejectedFalse(username);
    }

    public List<Lease> getPendingLease(String username, Long id){
        return repo.findByOwnerUsernameAndPropertyId(username,id);
    }
    
    public void updateLease(Long id,Lease data){
        Optional<Lease> existingOptional = repo.findById(id);
        if (existingOptional.isPresent()){
            Lease existing=existingOptional.get();

            if(data.getApproved()!=null)
            existing.setApproved(data.getApproved());

            if(data.getRejected()!=null)
            existing.setRejected(data.getRejected());
            
            if(data.getLeaseStartDate()!=null)
            existing.setLeaseStartDate(data.getLeaseStartDate());
            
            if(data.getLeaseEndDate()!=null)
            existing.setLeaseEndDate(data.getLeaseEndDate());

            if(data.getLeaseAmount()!=null)
            existing.setLeaseAmount(data.getLeaseAmount());

            repo.save(existing);
        }
        else{
            throw new NoSuchElementException("Lease not found with id " + id);
        }
    }
}
