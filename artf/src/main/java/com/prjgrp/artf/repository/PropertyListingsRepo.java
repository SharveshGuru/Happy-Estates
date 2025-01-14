package com.prjgrp.artf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.PropertyListingsModel;

@Repository
public interface PropertyListingsRepo extends JpaRepository<PropertyListingsModel,Integer>{

}