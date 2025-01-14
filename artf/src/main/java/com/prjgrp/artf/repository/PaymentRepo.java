package com.prjgrp.artf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {

}
