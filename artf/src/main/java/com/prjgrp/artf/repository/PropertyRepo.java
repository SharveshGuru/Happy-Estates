package com.prjgrp.artf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Property;
import com.prjgrp.artf.model.User;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Long> {
    List<Property> findByOwner(User owner);

    Property findByTenant(User tenant);

    List<Property> findByAvailabilityStatus(Boolean availabilityStatus);

}
