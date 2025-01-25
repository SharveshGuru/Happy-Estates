package com.prjgrp.artf.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjgrp.artf.model.Payment;
import com.prjgrp.artf.model.Property;
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
    @Autowired
    PropertyService propertyservice;

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

    public List<Payment> getTenantPayments(String username){
        Property prop=propertyservice.getPropertyByTenant(username);
        return repo.findByLease(plmservice.getMapByProperty(prop.getId()).getLease());
    }

    public List<Payment> getOwnerPayments(String username){
        return repo.findByLeaseApprovedTrueAndLeaseOwnerUsername(username);
    }
}
