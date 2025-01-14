package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Lease lease;

    private String paymentMadeBy;

    private LocalDate paymentDate;

    private String remarks;

    private String description;
}
