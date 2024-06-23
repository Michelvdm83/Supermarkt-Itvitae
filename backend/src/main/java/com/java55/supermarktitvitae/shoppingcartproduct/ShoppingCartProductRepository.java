package com.java55.supermarktitvitae.shoppingcartproduct;

import com.java55.supermarktitvitae.customer.Customer;
import com.java55.supermarktitvitae.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ShoppingCartProductRepository extends JpaRepository<ShoppingCartProduct, UUID> {
    List<ShoppingCartProduct> findByShoppingCart_CustomerAndShoppingCart_IsPayedTrueAndProduct_IsActiveTrue(Customer customer);

    List<ShoppingCartProduct> findByProductAndShoppingCart_IsPayedFalse(Product product);
}
