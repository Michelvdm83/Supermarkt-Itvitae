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
            @RequestBody ShoppingCartAddProductDto shoppingCartAddProductDto,
            UriComponentsBuilder ucb
    ) {
        if (shoppingCartAddProductDto.customerEmail() == null) return ResponseEntity.notFound().build();
        if (shoppingCartAddProductDto.productName() == null) return ResponseEntity.notFound().build();
        if (shoppingCartAddProductDto.quantity() == null) return ResponseEntity.notFound().build();

        var possibleCustomer = customerRepository.findById(shoppingCartAddProductDto.customerEmail());
        if (possibleCustomer.isEmpty()) return ResponseEntity.notFound().build();
        Customer customer = possibleCustomer.get();

        ShoppingCart shoppingCart;

        if (shoppingCartAddProductDto.shoppingCartId() == null) {
            shoppingCart = new ShoppingCart(customer);
            shoppingCartRepository.save(shoppingCart);
        } else {
            if (shoppingCartRepository.findById(shoppingCartAddProductDto.shoppingCartId()).isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            shoppingCart = shoppingCartRepository.findById(shoppingCartAddProductDto.shoppingCartId()).get();
        }

        var possibleProduct = productRepository.findByName(shoppingCartAddProductDto.productName());
        if (possibleProduct.isEmpty()) return ResponseEntity.notFound().build();
        Product product = possibleProduct.get();

        ShoppingCartProduct shoppingCartProduct = new ShoppingCartProduct(shoppingCart, product, shoppingCartAddProductDto.quantity());
        shoppingCartProductRepository.save(shoppingCartProduct);


        var uri = ucb.path("api/v1/shoppingcarts/{id}").buildAndExpand(shoppingCart.getId()).toUri();
        return ResponseEntity.created(uri).body();
    }

}
