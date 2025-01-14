package com.prjgrp.artf.service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.PropertyListingsModel;
import com.prjgrp.artf.repository.PropertyListingsRepo;

@Service
public class PropertyListingsService {
    @Autowired
    PropertyListingsRepo plrepo;

    public List<PropertyListingsModel> getPropertyListings(){
        return plrepo.findAll();
    }

    public void addPropertyListing(PropertyListingsModel pl){
        plrepo.save(pl);
    }
}
