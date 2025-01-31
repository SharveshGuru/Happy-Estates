package com.prjgrp.artf.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Property;
import com.prjgrp.artf.model.PropertyLeaseMap;
import com.prjgrp.artf.model.User;

@Repository
public interface PropertyLeaseMapRepo extends JpaRepository<PropertyLeaseMap, Long> {
    
    List<PropertyLeaseMap> findByOwner(User owner);

    PropertyLeaseMap findByProperty(Property property);

    PropertyLeaseMap findByPropertyId(Long id);

    List<PropertyLeaseMap> findByOwnerAndLeaseIsNotNull(User owner);

    void deleteByPropertyId(Long id);

    void deleteByProperty(Property data);
}
