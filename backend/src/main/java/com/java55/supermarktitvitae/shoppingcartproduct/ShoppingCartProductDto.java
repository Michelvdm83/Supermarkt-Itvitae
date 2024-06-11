package com.java55.supermarktitvitae.shoppingcartproduct;

public record ShoppingCartProductDto(String productName, int quantity, double totalPrice) {
    public static ShoppingCartProductDto from(ShoppingCartProduct shoppingCartProduct) {
        String productName = shoppingCartProduct.getProduct().getName();
        int quantity = shoppingCartProduct.getQuantity();
        double singlePrice = shoppingCartProduct.getProduct().getPrice();
        double totalPrice = singlePrice * quantity;

        return new ShoppingCartProductDto(productName, quantity, totalPrice);
    }
}

