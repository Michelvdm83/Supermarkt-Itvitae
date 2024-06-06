package com.java55.supermarktitvitae.shoppingcart;

import com.java55.supermarktitvitae.customer.CustomerRepository;
import com.java55.supermarktitvitae.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("api/v1/shoppingcarts")
@RequiredArgsConstructor
public class ShoppingCartController {
    private final ShoppingCartRepository shoppingCartRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    @PostMapping("{customerEmail}/{productName}")
    public ResponseEntity<ShoppingCart> AddProduct(@PathVariable String customerEmail, @PathVariable String productName, UriComponentsBuilder ucb) {
//        if (customerEmail == null) return ResponseEntity.notFound().build();
//        if (productName == null) return ResponseEntity.notFound().build();
//
//        var possibleCustomer = customerRepository.findById(customerEmail);
//        if (possibleCustomer.isEmpty()) return ResponseEntity.notFound().build();
//        Customer customer = possibleCustomer.get();
//
//        ShoppingCart shoppingCart = new ShoppingCart(customer);
//        shoppingCartRepository.save(shoppingCart);
//
//        var possibleProduct = productRepository.findByName(productName);
//        if (possibleProduct.isEmpty()) return ResponseEntity.notFound().build();
//        Product product = possibleProduct.get();
//
//        var uri = ucb.path("api/v1/shoppingcarts/{id}").buildAndExpand(shoppingCart.getId()).toUri();
//        return ResponseEntity.created(uri).body(shoppingCartRepository.save(shoppingCart));
        return ResponseEntity.ok().build();
    }

}
