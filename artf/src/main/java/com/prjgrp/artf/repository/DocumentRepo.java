package com.prjgrp.artf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Document;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Long> {

    public List<Document> findByLeaseId(Long id);

    public List<Document> findByDocumentTypeAndLeaseId(String documentType, Long id);

}
