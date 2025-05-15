package com.bgmsons.backend.repository;

import com.bgmsons.backend.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByUsername(String username);
} 