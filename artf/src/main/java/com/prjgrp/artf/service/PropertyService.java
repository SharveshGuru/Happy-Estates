package com.prjgrp.artf.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.Property;
import com.prjgrp.artf.model.User;
import com.prjgrp.artf.repository.PropertyRepo;
import com.prjgrp.artf.repository.UserRepo;

@Service
public class PropertyService {
    @Autowired
    PropertyRepo repo;
    @Autowired
    UserRepo user;

    public List<Property> getProperties(){
        return repo.findAll();
    }

    public Optional<Property> getPropertyById(Long id){
        return repo.findById(id);
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

    public void updateProperty(Long id,Property data){
        Optional<Property> existingOptional = repo.findById(id);
        if(existingOptional.isPresent()){
            Property existing=existingOptional.get();

            if(data.getAddress()!=null)
            existing.setAddress(data.getAddress());

            if(data.getName()!=null)
            existing.setName(data.getName());

            if(data.getNumberOfRooms()!=null)
            existing.setNumberOfRooms(data.getNumberOfRooms());

            if(data.getPlotArea()!=null)
            existing.setPlotArea(data.getPlotArea());

            if(data.getPrice()!=null){
                existing.setPrice(data.getPrice());
            }
            
            if(data.getAvailabilityStatus()==false){
                existing.setAvailabilityStatus(data.getAvailabilityStatus());
                existing.setTenant(null);
            }

            if(data.getTenant()!=null){
                existing.setTenant(data.getTenant());
                existing.setAvailabilityStatus(true);
            }

            if(data.getImages()!=null)
            existing.setImages(data.getImages());

            if (data.getDetails()!=null)
            existing.setDetails(data.getDetails());

        }
        else{
            throw new NoSuchElementException("Propert not found with id"+id);
        }
    }
}
