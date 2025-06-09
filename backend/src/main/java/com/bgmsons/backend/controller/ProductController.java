package com.bgmsons.backend.controller;

import com.bgmsons.backend.model.Product;
import com.bgmsons.backend.repository.ProductRepository;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Add product (admin)
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody @Valid Product product,
                                              UriComponentsBuilder uriBuilder) {
        Product saved = productRepository.save(product);
        URI location = uriBuilder.path("/api/products/{id}")
                                 .build(saved.getId());
        return ResponseEntity.created(location).body(saved);
     }

    // Edit product (admin)
    @PutMapping("/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable String id, @RequestBody Product product) {
        Optional<Product> existing = productRepository.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        product.setId(id);
        Product updated = productRepository.save(product);
        return ResponseEntity.ok(updated);
    }

    // Delete product (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Get all products (admin/user)
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
     }

    // Get product by id (admin/user)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
} 
