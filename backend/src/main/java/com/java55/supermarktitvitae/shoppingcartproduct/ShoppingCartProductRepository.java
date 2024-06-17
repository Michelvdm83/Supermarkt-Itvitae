package com.java55.supermarktitvitae.shoppingcartproduct;

import com.java55.supermarktitvitae.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ShoppingCartProductRepository extends JpaRepository<ShoppingCartProduct, UUID> {
    List<ShoppingCartProduct> findByShoppingCart_Customer(Customer customer);
}
