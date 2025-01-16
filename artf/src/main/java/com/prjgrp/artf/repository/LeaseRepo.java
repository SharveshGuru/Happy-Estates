package com.prjgrp.artf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Lease;
import java.util.List;


@Repository
public interface LeaseRepo extends JpaRepository<Lease, Long> {
    List<Lease> findByApproved(Boolean approved);

    List<Lease> findByRejected(Boolean rejected);

    List<Lease> findByApprovedFalseAndRejectedFalse();

}
