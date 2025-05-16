package com.bgmsons.backend.repository;

import com.bgmsons.backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
    // No need to redeclare save, findById, findAll, etc.
} 