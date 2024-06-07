package com.java55.supermarktitvitae.shoppingcart;

import com.java55.supermarktitvitae.customer.Customer;
import com.java55.supermarktitvitae.customer.CustomerRepository;
import com.java55.supermarktitvitae.product.Product;
import com.java55.supermarktitvitae.product.ProductRepository;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProduct;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/shoppingcarts")
@RequiredArgsConstructor
public class ShoppingCartController {
    private final ShoppingCartRepository shoppingCartRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final ShoppingCartProductRepository shoppingCartProductRepository;

    @GetMapping("{id}")
    public ResponseEntity<ShoppingCart> GetById(@PathVariable UUID id) {
        if (id == null) return ResponseEntity.badRequest().build();

        var possibleShoppingCart = shoppingCartRepository.findById(id);
        return possibleShoppingCart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ShoppingCart> AddProduct(
            @RequestBody ShoppingCartDto shoppingCartDto,
            UriComponentsBuilder ucb
    ) {
        if (shoppingCartDto.customerEmail() == null) return ResponseEntity.notFound().build();
        if (shoppingCartDto.productName() == null) return ResponseEntity.notFound().build();
        if (shoppingCartDto.quantity() == null) return ResponseEntity.notFound().build();

        var possibleCustomer = customerRepository.findById(shoppingCartDto.customerEmail());
        if (possibleCustomer.isEmpty()) return ResponseEntity.notFound().build();
        Customer customer = possibleCustomer.get();

        ShoppingCart shoppingCart = new ShoppingCart(customer);
        ShoppingCart savedShoppingCart = shoppingCartRepository.save(shoppingCart);

        var possibleProduct = productRepository.findByName(shoppingCartDto.productName());
        if (possibleProduct.isEmpty()) return ResponseEntity.notFound().build();
        Product product = possibleProduct.get();

        ShoppingCartProduct shoppingCartProduct = new ShoppingCartProduct(shoppingCart, product, shoppingCartDto.quantity());
        shoppingCartProductRepository.save(shoppingCartProduct);

        var uri = ucb.path("api/v1/shoppingcarts/{id}").buildAndExpand(shoppingCart.getId()).toUri();
        return ResponseEntity.created(uri).body(savedShoppingCart);
    }

}
