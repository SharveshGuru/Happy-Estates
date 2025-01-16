package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "leases")
public class Lease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User owner;

    @ManyToOne
    private User tenant;

    private LocalDate leaseStartDate;

    private LocalDate leaseEndDate;

    @Transient
    private Long duration;

    private Double leaseAmount;

    @Column(nullable = false)
    private Boolean approved = false;

    @PrePersist
    @PreUpdate
    private void calculateDuration() {
        if (leaseStartDate != null && leaseEndDate != null) {
            this.duration = ChronoUnit.DAYS.between(leaseStartDate, leaseEndDate);
        }
    }
}
