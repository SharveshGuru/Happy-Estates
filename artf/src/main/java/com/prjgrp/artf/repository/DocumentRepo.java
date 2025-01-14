package com.prjgrp.artf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prjgrp.artf.model.Document;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Long> {

}
