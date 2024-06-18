package com.java55.supermarktitvitae.shoppingcart;

import com.java55.supermarktitvitae.customer.Customer;
import com.java55.supermarktitvitae.product.Product;
import com.java55.supermarktitvitae.product.ProductRepository;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProduct;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("api/v1/shoppingcarts")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class ShoppingCartController {
    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductRepository productRepository;
    private final ShoppingCartProductRepository shoppingCartProductRepository;

    @GetMapping
    public ResponseEntity<ShoppingCartDto> GetByUserName(Authentication authentication) {
        Customer customer = (Customer) authentication.getPrincipal();

        ShoppingCart shoppingCart;

        var possibleShoppingCarts = shoppingCartRepository.findByCustomerAndIsPayed(customer, false);
        if (possibleShoppingCarts.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            shoppingCart = possibleShoppingCarts.get();
        }

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

        ShoppingCart shoppingCart;

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
