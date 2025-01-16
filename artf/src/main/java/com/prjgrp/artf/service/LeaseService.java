package com.prjgrp.artf.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.Lease;
import com.prjgrp.artf.repository.LeaseRepo;

@Service
public class LeaseService {
    @Autowired
    LeaseRepo repo;

    public List<Lease> getAllLeases(){
        return repo.findAll();
    }

    public Optional<Lease> getLeaseById(Long id){
        return repo.findById(id);
    }

    public void addLease(Lease data){
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
