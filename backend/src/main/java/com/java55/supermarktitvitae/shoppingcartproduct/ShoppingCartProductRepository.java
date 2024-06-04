package com.java55.supermarktitvitae.shoppingcartproduct;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShoppingCartProductRepository extends JpaRepository<ShoppingCartProduct, UUID> {
}
