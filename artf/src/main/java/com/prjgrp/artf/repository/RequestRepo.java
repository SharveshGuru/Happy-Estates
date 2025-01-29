package com.prjgrp.artf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Request;

@Repository
public interface RequestRepo extends JpaRepository<Request, Long> {
    public List<Request> findByLeasePropertyId(Long id);

    public List<Request> findByLeaseTenantUsername(String username);

    public List<Request> findByLeaseOwnerUsername(String username);
}
