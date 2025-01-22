package com.prjgrp.artf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Lease;
import com.prjgrp.artf.model.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
    public List<Payment> findByLease(Lease lease);
}
