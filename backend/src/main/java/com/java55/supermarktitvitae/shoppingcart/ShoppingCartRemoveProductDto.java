package com.java55.supermarktitvitae.shoppingcart;

import java.util.UUID;

public record ShoppingCartRemoveProductDto(UUID shoppingCartId, UUID shoppingCartProductId) {
}
