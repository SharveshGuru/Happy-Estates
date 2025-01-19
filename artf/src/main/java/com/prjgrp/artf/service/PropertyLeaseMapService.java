package com.prjgrp.artf.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.Property;
import com.prjgrp.artf.model.PropertyLeaseMap;
import com.prjgrp.artf.model.User;
import com.prjgrp.artf.repository.PropertyLeaseMapRepo;
import com.prjgrp.artf.repository.PropertyRepo;
import com.prjgrp.artf.repository.UserRepo;

@Service
public class PropertyLeaseMapService {
    @Autowired
    PropertyLeaseMapRepo repo;
    @Autowired
    UserRepo user;
    @Autowired
    PropertyRepo prop;

    public List<PropertyLeaseMap> getMaps(){
        return repo.findAll();
    }

    public List<PropertyLeaseMap> getMapByOwner(String username){
        User owner=user.findByUsername(username);
        return repo.findByOwner(owner);
    }

    public PropertyLeaseMap getMapByProperty(Long id){
        Optional<Property> p=prop.findById(id);
        if(p.isPresent()){
            Property data=p.get();
            return repo.findByProperty(data);
        }
        return null;
    }

    public void addMap(PropertyLeaseMap data){
        repo.save(data);
    }

    public void deleteMap(Long id){
        repo.deleteById(id);
    }

    public void deleteByProperty(Long id){
        Optional<Property> p=prop.findById(id);
        if(p.isPresent()){
            PropertyLeaseMap plm=repo.findByProperty(p.get());
            plm.setLease(null);
            repo.save(plm);
  
            
        }
    }

}
