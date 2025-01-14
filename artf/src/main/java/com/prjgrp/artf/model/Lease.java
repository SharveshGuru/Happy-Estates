package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@Entity
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

    @PrePersist
    @PreUpdate
    private void calculateDuration() {
        if (leaseStartDate != null && leaseEndDate != null) {
            this.duration = ChronoUnit.DAYS.between(leaseStartDate, leaseEndDate);
        }
    }
}
