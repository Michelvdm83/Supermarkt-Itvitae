package com.java55.supermarktitvitae.shoppingcart;

import com.java55.supermarktitvitae.customer.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
public class ShoppingCart {
    @Id
    @GeneratedValue
    private UUID id;

    private Customer customer;

    @Setter
    private boolean isPayed;

    public ShoppingCart(Customer customer) {
        this.customer = customer;
        isPayed = false;
    }

}
