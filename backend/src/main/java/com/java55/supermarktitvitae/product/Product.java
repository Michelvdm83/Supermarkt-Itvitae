package com.java55.supermarktitvitae.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Product {
    @Id
    private String name;
    private double price;
    private String description;
    private Category category;
    private Double salesPrice;



}
