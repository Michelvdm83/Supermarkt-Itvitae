package com.java55.supermarktitvitae.shoppingcartproduct;

import java.util.UUID;

public record ShoppingCartProductDto(String productName, int quantity, double totalPrice, UUID uuid) {
    public static ShoppingCartProductDto from(ShoppingCartProduct shoppingCartProduct) {
        String productName = shoppingCartProduct.getProduct().getName();
        int quantity = shoppingCartProduct.getQuantity();
        double singlePrice;

        Double salesPrice = shoppingCartProduct.getProduct().getSalesPrice();
        if (salesPrice == null) {
            singlePrice = shoppingCartProduct.getProduct().getPrice();
        } else {
            singlePrice = salesPrice;
        }


        double totalPrice = singlePrice * quantity;
        UUID uuid = shoppingCartProduct.getId();

        return new ShoppingCartProductDto(productName, quantity, totalPrice, uuid);
    }
}

