package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private String numberOfRooms;

    private Double plotArea;

    private String address;

    private Double price;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User owner;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User tenant;

    private Boolean availabilityStatus = true;

    private LocalDate postedOn;

    @ElementCollection
    private List<String> images;

    private String details;
}
