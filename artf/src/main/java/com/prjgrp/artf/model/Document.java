package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentName;

    private String documentType;

    @ManyToOne
    private Lease lease;

    @Lob
    private byte[] document;
}