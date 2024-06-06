package com.java55.supermarktitvitae.shoppingcartproduct;

import com.java55.supermarktitvitae.product.Product;
import com.java55.supermarktitvitae.shoppingcart.ShoppingCart;
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
public class ShoppingCartProduct {

    @Id
    @GeneratedValue
    private UUID id;

    //private ShoppingCart shoppingCart;
    // private Product product;

    @Setter
    private int quantity;

    public ShoppingCartProduct(ShoppingCart shoppingCart, Product product, int quantity) {
        //  this.shoppingCart = shoppingCart;
        // this.product = product;
        this.quantity = quantity;
    }

}
