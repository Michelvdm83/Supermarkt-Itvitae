package com.java55.supermarktitvitae.shoppingcart;

import com.java55.supermarktitvitae.customer.Customer;
import com.java55.supermarktitvitae.customer.CustomerRepository;
import com.java55.supermarktitvitae.product.Product;
import com.java55.supermarktitvitae.product.ProductRepository;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProduct;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/shoppingcarts")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class ShoppingCartController {
    private final ShoppingCartRepository shoppingCartRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final ShoppingCartProductRepository shoppingCartProductRepository;

    @GetMapping("{id}")
    public ResponseEntity<ShoppingCartDto> GetById(@PathVariable UUID id) {
        if (id == null) return ResponseEntity.badRequest().build();

        var possibleShoppingCart = shoppingCartRepository.findById(id);
        if (possibleShoppingCart.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ShoppingCart shoppingCart = possibleShoppingCart.get();

        return ResponseEntity.ok(ShoppingCartDto.from(shoppingCart));
    }

    @PostMapping
    public ResponseEntity<ShoppingCartDto> AddProduct(
            @RequestBody ShoppingCartAddProductDto shoppingCartAddProductDto,
            UriComponentsBuilder ucb,
            Authentication authentication
    ) {
        Customer customer = (Customer) authentication.getPrincipal();
        if (shoppingCartAddProductDto.productName() == null) return ResponseEntity.notFound().build();
        if (shoppingCartAddProductDto.quantity() == null) return ResponseEntity.notFound().build();
        if (shoppingCartAddProductDto.quantity() <= 0) ResponseEntity.badRequest().build();

        ShoppingCart shoppingCart = null;

        var possibleShoppingCarts = shoppingCartRepository.findByCustomerAndIsPayed(customer, false);
        if (possibleShoppingCarts.isEmpty()) {
            shoppingCart = new ShoppingCart(customer);
            shoppingCartRepository.save(shoppingCart);
        } else {
            shoppingCart = possibleShoppingCarts.get();
        }

        var possibleProduct = productRepository.findByName(shoppingCartAddProductDto.productName());
        if (possibleProduct.isEmpty()) return ResponseEntity.notFound().build();
        Product product = possibleProduct.get();

        ShoppingCartProduct shoppingCartProduct = new ShoppingCartProduct(shoppingCart, product, shoppingCartAddProductDto.quantity());
        shoppingCartProductRepository.save(shoppingCartProduct);

        shoppingCart.addProduct(shoppingCartProduct);

        var uri = ucb.path("api/v1/shoppingcarts/{id}").buildAndExpand(shoppingCart.getId()).toUri();
        return ResponseEntity.created(uri).body(ShoppingCartDto.from(shoppingCart));
    }
}
