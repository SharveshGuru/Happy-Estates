package com.prjgrp.artf.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prjgrp.artf.model.Document;
import com.prjgrp.artf.model.Lease;
import com.prjgrp.artf.model.User;
import com.prjgrp.artf.repository.DocumentRepo;
import com.prjgrp.artf.repository.LeaseRepo;
import com.prjgrp.artf.repository.UserRepo;

@Service
public class DocumentService {
    @Autowired
    DocumentRepo repo;
    @Autowired
    UserRepo userrepo;
    @Autowired
    LeaseRepo leaseRepo;

    public void addDocument(MultipartFile file, String documentName,String documentType,String uploadedBy, Long leaseid) throws IOException{
        Document doc=new Document();
        User u=userrepo.findByUsername(uploadedBy);
        Lease l=leaseRepo.findById(leaseid).get();
        doc.setDocumentName(documentName);
        doc.setDocumentType(documentType);
        doc.setUploadedBy(u);
        doc.setFileType(file.getContentType());
        doc.setDocument(file.getBytes());
        doc.setLease(l);
        repo.save(doc);
    }

    public List<Document> getDocumentsByLeaseId(Long id){
        return repo.findByLeaseId(id);
    }

    public List<Document> getDocumentsByLeaseIdDocType(Long id,String doctype){
        return repo.findByDocumentTypeAndLeaseId(doctype,id);
    }
}
