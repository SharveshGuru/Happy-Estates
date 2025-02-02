package com.prjgrp.artf.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner')")
    public void addDocument(
        @RequestParam("file") MultipartFile file,
        @RequestParam("documentName") String documentName,
        @RequestParam("documentType") String documentType,
        @RequestParam("leaseid") Long leaseid,
        @RequestParam("propertyid") Long propertyid,
        @RequestParam("uploadedBy") String uploadedBy
    ) throws IOException {
        service.addDocument(file, documentName, documentType, uploadedBy, leaseid, propertyid);
            
    }

    @PostMapping("/images")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner')")
    public void addDocuments(
        @RequestParam("files") MultipartFile[] files, // Change to array
        @RequestParam("documentName") String documentName,
        @RequestParam("documentType") String documentType,
        @RequestParam("propertyid") Long propertyid,
        @RequestParam("uploadedBy") String uploadedBy
    ) throws IOException {
        for (MultipartFile file : files) {
            service.addDocument(file, documentName, documentType, uploadedBy,propertyid);
        }
    }


    @GetMapping("/propertydocs/{id}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public List<Document> getPropertyDocs(@PathVariable Long id) {
        return service.getDocumentsByLeaseIdDocType(id, "Lease Document");
    }

    @GetMapping("/propertyimages/{id}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner') or hasRole('ROLE_Tenant')")
    public List<Document> getPropertyImages(@PathVariable Long id) {
        return service.getImagesByProperty(id);
    }

    @DeleteMapping("/deleteimage/{id}")
    @PreAuthorize("hasRole('ROLE_Admin') or hasRole('ROLE_Owner')")
    public void deleteImage(@PathVariable Long id){
        service.removeImage(id);
    }
}
