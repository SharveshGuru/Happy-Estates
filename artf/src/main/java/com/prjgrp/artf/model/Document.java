package com.prjgrp.artf.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentName;

    private String documentType;

    private String fileType;

    @ManyToOne
    @JoinColumn(name="property_id")
    private Property property;

    @ManyToOne
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    @ManyToOne
    private Lease lease;

    @Lob
    private byte[] document;
}