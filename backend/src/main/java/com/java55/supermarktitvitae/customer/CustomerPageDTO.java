package com.java55.supermarktitvitae.customer;

import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductMostBoughtDTO;

import java.util.List;

public record CustomerPageDTO(CustomerDTO customerInfo, List<ShoppingCartProductMostBoughtDTO> mostBoughtProducts) {
}
