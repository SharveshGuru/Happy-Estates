package com.prjgrp.artf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Lease;

@Repository
public interface LeaseRepo extends JpaRepository<Lease, Integer> {

}
