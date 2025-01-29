package com.prjgrp.artf.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.prjgrp.artf.model.Lease;
import com.prjgrp.artf.model.Property;
import com.prjgrp.artf.model.User;
import com.prjgrp.artf.repository.LeaseRepo;
import com.prjgrp.artf.repository.PropertyRepo;
import com.prjgrp.artf.repository.UserRepo;

@Service
public class PropertyService {
    @Autowired
    PropertyRepo repo;
    @Autowired
    UserRepo user;
    @Autowired
    LeaseRepo lease;

    public List<Property> getProperties(){
        return repo.findAll();
    }

    public Optional<Property> getPropertyById(Long id){
        return repo.findById(id);
    }

    public String checkTenant(String tenant){
        User t=user.findByUsername(tenant);
        Property p=repo.findByTenant(t);
        if(p==null){
            return "True";
        }
        else{
            return "False";
        }
    }

    public void addProperty(String owner,Property data){
        User un=user.findByUsername(owner);
        data.setOwner(un);
        repo.save(data);
    }
    
    public List<Property> getPropertiesByOwner(String data){
        User owner=user.findByUsername(data);
        return repo.findByOwner(owner);
    } 

    public Property getPropertyByTenant(String data){
        User tenant=user.findByUsername(data);
        return repo.findByTenant(tenant);
    }

    public List<Property> getAvailableProperties(Boolean availabilityStatus){
        return repo.findByAvailabilityStatus(availabilityStatus);
    }

    public List<Property> getUnavailableProperties(Boolean availabilityStatus){
        return repo.findByAvailabilityStatus(availabilityStatus);
    }

    public List<Property> getLeasedPropertiesByOwner(String username){
        return repo.findByAvailabilityStatusFalseAndOwnerUsername(username);
    }

    public void updateProperty(Long id, Property data) {
        Optional<Property> existingOptional = repo.findById(id);
        if (existingOptional.isPresent()) {
            Property existing = existingOptional.get();
            if (data.getAddress() != null) existing.setAddress(data.getAddress());
            if (data.getName() != null) existing.setName(data.getName());
            if (data.getNumberOfRooms() != null) existing.setNumberOfRooms(data.getNumberOfRooms());
            if (data.getPlotArea() != null) existing.setPlotArea(data.getPlotArea());
            if (data.getPrice() != null) existing.setPrice(data.getPrice());
    
            if (data.getAvailabilityStatus() != null) {
                existing.setAvailabilityStatus(data.getAvailabilityStatus());
    
                // if (data.getAvailabilityStatus() == false) {
                //     existing.setTenant(null);
                // }
            }
    
            if (data.getTenant() != null) {
                existing.setTenant(data.getTenant());
            }
    
            if (data.getDetails() != null) existing.setDetails(data.getDetails());    
            repo.save(existing);
        } else {
            throw new NoSuchElementException("Property not found with id " + id);
        }
    }

    public void removeTenant(Long id){
        Optional<Property> existingOptional = repo.findById(id);
        if (existingOptional.isPresent()) {
            Property existing = existingOptional.get();
            existing.setAvailabilityStatus(true);
            existing.setTenant(null);
            repo.save(existing);
        } else {
            throw new NoSuchElementException("Property not found with id " + id);
        }
    }

    @Scheduled(cron="0 0 0 * * ?")
    @Transactional
    public void updatePropertyAvailability(){
        LocalDate today=LocalDate.now();
        List<Lease> leases=lease.findByLeaseEndDateBeforeAndApprovedIsTrue(today);
        for(Lease l:leases){
            Property p=l.getProperty();
            p.setAvailabilityStatus(true);
            p.setTenant(null);
            repo.save(p);
        }
    }
}
