package com.java55.supermarktitvitae.shoppingcart;

import java.util.UUID;

public record ShoppingCartAddProductDto(String customerEmail,
                                        String productName,
                                        Integer quantity,
                                        UUID shoppingCartId) {
}