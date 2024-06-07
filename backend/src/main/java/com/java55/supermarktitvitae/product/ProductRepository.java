package com.java55.supermarktitvitae.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {

    public List<Product> findByNameContainsIgnoreCase(String contains);

}
