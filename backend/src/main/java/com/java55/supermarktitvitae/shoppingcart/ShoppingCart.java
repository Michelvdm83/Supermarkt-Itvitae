package com.java55.supermarktitvitae.shoppingcart;


import com.java55.supermarktitvitae.customer.Customer;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProduct;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
public class ShoppingCart {
    @Id
    @GeneratedValue
    private UUID id;

    private Customer customer;

    @OneToMany(mappedBy = "shoppingCart")
    private final Set<ShoppingCartProduct> products = new HashSet<>();

    @Setter
    private boolean isPayed;

    public ShoppingCart(Customer customer) {
        this.customer = customer;
        isPayed = false;
    }

}
