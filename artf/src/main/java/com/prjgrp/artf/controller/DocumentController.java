package com.prjgrp.artf.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.prjgrp.artf.model.Document;
import com.prjgrp.artf.service.DocumentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin
public class DocumentController {
    @Autowired
    DocumentService service;

    @PostMapping("/documents")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_Owner')")
    public void addDocument(
        @RequestParam("file") MultipartFile file,
        @RequestParam("documentName") String documentName,
        @RequestParam("documentType") String documentType,
        @RequestParam("leaseid") Long leaseid,
        @RequestParam("uploadedBy") String uploadedBy
    ) throws IOException {
        service.addDocument(file, documentName, documentType, uploadedBy, leaseid);
            
    }

    @GetMapping("/propertydocs/{id}")
    public List<Document> getPropertyDocs(@PathVariable Long id) {
        return service.getDocumentsByLeaseIdDocType(id, "Lease Document");
    }
}
