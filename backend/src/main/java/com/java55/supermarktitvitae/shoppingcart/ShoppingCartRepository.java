package com.java55.supermarktitvitae.shoppingcart;

import com.java55.supermarktitvitae.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, UUID> {
    Optional<ShoppingCart> findByCustomerAndIsPayed(Customer customer, boolean isPayed);
}
