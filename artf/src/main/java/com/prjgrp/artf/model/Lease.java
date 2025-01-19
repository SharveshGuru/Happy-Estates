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

    @ManyToOne(cascade = CascadeType.MERGE)
    private User owner;

    @ManyToOne(cascade = CascadeType.MERGE)
    private User tenant;

    @ManyToOne(cascade = CascadeType.MERGE)
    private Property property;

    private LocalDate appliedOn;

    private LocalDate leaseStartDate;

    private LocalDate leaseEndDate;

    private Long duration;

    private Double leaseAmount;

    @Column(nullable = false)
    private Boolean approved = false;

    @Column(nullable = false)
    private Boolean rejected = false;

    @PrePersist
    @PreUpdate
    private void calculateDuration() {
        if (leaseStartDate != null && leaseEndDate != null) {
            this.duration = ChronoUnit.DAYS.between(leaseStartDate, leaseEndDate);
        }

        if (appliedOn == null) {
            this.appliedOn = LocalDate.now();
        }
    }
}
