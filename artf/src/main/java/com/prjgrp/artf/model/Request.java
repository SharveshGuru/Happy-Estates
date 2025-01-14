package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String requestMadeBy;

    @ManyToOne
    private Lease lease;

    private String description;

    private LocalDate requestDate;

    private String remarks;

    @Column(length = 255)
    private String status;
}