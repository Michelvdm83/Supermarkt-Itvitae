package com.java55.supermarktitvitae.product;

import com.java55.supermarktitvitae.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByNameContainsIgnoreCaseOrderByName(String contains);

    List<Product> findBySalesPriceNotNullOrderByCategory();

    Optional<Product> findByNameIgnoreCase(String name);

    Optional<Product> findByName(String name);

    List<Product> findByCategory(Category category);
}
