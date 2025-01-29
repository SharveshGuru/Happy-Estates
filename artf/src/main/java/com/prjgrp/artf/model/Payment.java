package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "payments")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Lease lease;

    @ManyToOne
    @JoinColumn(name = "payment_made_by")
    private User paymentMadeBy;

    private LocalDate paymentDate;

    private String remarks;

    private String description;

    private Double amount;

    @ManyToOne
    private Document proof;

}
