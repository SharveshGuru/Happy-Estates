package com.prjgrp.artf.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.Payment;
import com.prjgrp.artf.model.User;
import com.prjgrp.artf.repository.PaymentRepo;

@Service
public class PaymentService {
    @Autowired
    PaymentRepo repo;
    @Autowired
    PropertyLeaseMapService plmservice;
    @Autowired
    LeaseService leaseservice;
    @Autowired
    UserService userservice;

    public void addPayment(Payment data) {
        User madeby=userservice.getUserByUsername(data.getPaymentMadeBy().getUsername());
        data.setPaymentMadeBy(madeby);
        repo.save(data);
    }

    public List<Payment> getAllPayments() {
        return repo.findAll();
    }

    public List<Payment> getPaymentsByLease(Long propid){
        return repo.findByLease(plmservice.getMapByProperty(propid).getLease());
    }
}
