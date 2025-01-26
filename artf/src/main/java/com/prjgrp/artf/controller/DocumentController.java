package com.prjgrp.artf.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.prjgrp.artf.model.Lease;
import com.prjgrp.artf.service.DocumentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin
public class DocumentController {
    @Autowired
    DocumentService service;

    @PostMapping("/documents")
    public void addDocument(
        @RequestParam("file") MultipartFile file,
        @RequestParam("documentName") String documentName,
        @RequestParam("documentType") String documentType,
        @RequestParam("leaseid") Long leaseid,
        @RequestParam("uploadedBy") String uploadedBy
    ) throws IOException {
        service.addDocument(file, documentName, documentType, uploadedBy, leaseid);
            
    }
    
}
