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
            return ResponseEntity.noContent().build();
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

        var shoppingCartProducts = shoppingCart.getShoppingCartProducts();
        ShoppingCartProduct shoppingCartProduct = new ShoppingCartProduct();

        boolean isNewProduct = true;
        for (ShoppingCartProduct current : shoppingCartProducts) {
            if (current.getProduct().getName().equals(product.getName())) {
                int oldQuantity = current.getQuantity();
                int quantityToAdd = shoppingCartAddProductDto.quantity();
                current.setQuantity(oldQuantity + quantityToAdd);
                isNewProduct = false;
                shoppingCartProduct = current;
                break;
            }
        }

        if (isNewProduct) {
            shoppingCartProduct = new ShoppingCartProduct(shoppingCart, product, shoppingCartAddProductDto.quantity());
            shoppingCart.addProduct(shoppingCartProduct);
        }
        shoppingCartProductRepository.save(shoppingCartProduct);

        var uri = ucb.path("api/v1/shoppingcarts/{id}").buildAndExpand(shoppingCart.getId()).toUri();
        return ResponseEntity.created(uri).body(ShoppingCartDto.from(shoppingCart));
    }

    @PatchMapping
    public ResponseEntity<ShoppingCartDto> removeProduct(@RequestBody ShoppingCartRemoveProductDto shoppingCartRemoveProductDto) {
        var possibleCart = shoppingCartRepository.findById(shoppingCartRemoveProductDto.shoppingCartId());
        if (possibleCart.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var currentCart = possibleCart.get();

        var possibleCartProduct = shoppingCartProductRepository.findById(shoppingCartRemoveProductDto.shoppingCartProductId());
        if (possibleCartProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var productToRemove = possibleCartProduct.get();

        if (currentCart.getShoppingCartProducts().contains(productToRemove)) {
            currentCart.removeProduct(productToRemove);
            shoppingCartProductRepository.delete(productToRemove);
        } else {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(ShoppingCartDto.from(currentCart));
    }

    @PatchMapping("/checkout")
    public ResponseEntity<?> checkout(Authentication authentication) {
        Customer customer = (Customer) authentication.getPrincipal();
        var possibleShoppingCart = shoppingCartRepository.findByCustomerAndIsPayed(customer, false);
        if (possibleShoppingCart.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var payedShoppingCart = possibleShoppingCart.get();
        payedShoppingCart.setPayed(true);
        shoppingCartRepository.save(payedShoppingCart);

        return ResponseEntity.noContent().build();
    }
}
