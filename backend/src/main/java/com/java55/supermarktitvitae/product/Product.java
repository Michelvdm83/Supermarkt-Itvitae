package com.java55.supermarktitvitae.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    private String name;
    private double price;
    private String description;
    private Category category;
    private Double salesPrice;

    public Product(String name, double price, String description, Category category, Double salesPrice) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.salesPrice = salesPrice;
    }
}
