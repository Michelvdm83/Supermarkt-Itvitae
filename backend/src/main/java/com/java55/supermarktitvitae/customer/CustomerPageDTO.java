package com.java55.supermarktitvitae.customer;

import com.java55.supermarktitvitae.product.Product;

import java.util.List;

public record CustomerPageDTO(String name, String email, List<Product> mostBoughtProducts) {
}
