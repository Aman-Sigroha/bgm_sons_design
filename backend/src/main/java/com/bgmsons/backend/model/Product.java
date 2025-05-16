package com.bgmsons.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "products")
public class Product {
    @Id
    private String id; // MongoDB uses String for _id

    private String name;
    private String category;
    private String subcategory;
    private List<String> images;
    private LocalDate created;
    private String description;
    private String specification;
    private String features;
} 