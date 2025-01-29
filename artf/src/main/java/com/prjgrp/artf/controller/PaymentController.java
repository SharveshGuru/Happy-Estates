package com.prjgrp.artf.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prjgrp.artf.model.Payment;
import com.prjgrp.artf.service.PaymentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin
public class PaymentController {
    @Autowired
    PaymentService service;

    @Autowired
    ObjectMapper obm;

    @PostMapping("/payments")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_Tenant') or hasRole('ROLE_Owner')")
    public void postPayment(
        @RequestParam("paymentData") String paymentData,
        @RequestParam("file") MultipartFile file,
        @RequestParam("documentName") String documentName
    ) throws IOException{
        Payment entity=obm.readValue(paymentData, Payment.class);
        service.addPayment(entity,file,documentName);
    }

    @GetMapping("/payments")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_Owner')")
    public List<Payment> getAllPayments() {
        return service.getAllPayments();
    }

    @GetMapping("/payments/{propid}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_Tenant') or hasRole('ROLE_Owner')")
    public List<Payment> getPaymentsByLease(@PathVariable Long propid){
        return service.getPaymentsByLease(propid);
    }

    @GetMapping("/tenantpayments/{username}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_Tenant')")
    public List<Payment> gettenantpayments(@PathVariable String username) {
        return service.getTenantPayments(username);
    }
    
    @GetMapping("/ownerpayments/{username}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_Owner')")
    public List<Payment> getOwnerPayments(@PathVariable String username) {
        return service.getOwnerPayments(username);
    }
    
}
