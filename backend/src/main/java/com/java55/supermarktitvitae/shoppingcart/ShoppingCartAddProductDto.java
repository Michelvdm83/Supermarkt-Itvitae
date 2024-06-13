package com.java55.supermarktitvitae.shoppingcart;

public record ShoppingCartAddProductDto(String customerEmail,
                                        String productName,
                                        Integer quantity) {
}