package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
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

    @ManyToOne
    private User owner;

    @ManyToOne
    private User tenant;

    private Boolean availabilityStatus = true;

    private LocalDate postedOn;

    @ElementCollection
    private List<String> images;

    private String details;
}
