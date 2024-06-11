package com.java55.supermarktitvitae.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {

    public List<Product> findByNameContainsIgnoreCase(String contains);

    Optional<Product> findByName(String productName);
}
