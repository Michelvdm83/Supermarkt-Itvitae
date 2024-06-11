package com.java55.supermarktitvitae.shoppingcart;

import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductDto;

import java.util.List;
import java.util.UUID;

record ShoppingCartDto(UUID shoppingCartId, List<ShoppingCartProductDto> shoppingCartProducts) {
    public static ShoppingCartDto from(ShoppingCart shoppingCart) {
        UUID shoppingCartId = shoppingCart.getId();
        var shoppingCardProducts = shoppingCart.getShoppingCartProducts().stream().map(ShoppingCartProductDto::from).toList();
        return new ShoppingCartDto(shoppingCartId, shoppingCardProducts);
    }
}