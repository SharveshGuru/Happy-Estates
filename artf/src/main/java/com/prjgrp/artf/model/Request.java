package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "request_made_by")
    private User requestMadeBy;

    @ManyToOne
    @JoinColumn(name = "lease_id")
    private Lease lease;

    private String description;

    private LocalDate requestDate;

    private String remarks;

    private String madeBy;

    @Column(length = 20)
    private String status="new";
}