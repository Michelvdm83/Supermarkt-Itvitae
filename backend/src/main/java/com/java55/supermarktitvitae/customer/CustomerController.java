package com.java55.supermarktitvitae.customer;

import com.java55.supermarktitvitae.product.Product;
import com.java55.supermarktitvitae.security.AuthDTO;
import com.java55.supermarktitvitae.security.JwtService;
import com.java55.supermarktitvitae.security.JwtTokenDTO;
import com.java55.supermarktitvitae.shoppingcart.ShoppingCartRepository;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProduct;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "${supermarktitvitae.cors}")
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final ShoppingCartProductRepository shoppingCartProductRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO) {
        if (authDTO.email() == null || authDTO.password() == null) {
            return ResponseEntity.badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "email and password are required"
                    ));
        }

        if (!(customerRepository.existsById(authDTO.email())
                && passwordEncoder.matches(authDTO.password(), customerRepository.getReferenceById(authDTO.email()).getPassword()))) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "email or password incorrect"
                    ));
        }

        return ResponseEntity.ok(new JwtTokenDTO(
                jwtService.generateTokenForCustomer(authDTO.email()),
                customerRepository.getReferenceById(authDTO.email()).getName()
        ));
    }

    @GetMapping("page-info")
    public ResponseEntity<CustomerPageDTO> getInfo(Authentication authentication) {
        Customer thisCustomer = (Customer) authentication.getPrincipal();

        //
        var shoppingcarts = shoppingCartRepository.findByCustomer(thisCustomer);
        var shoppingcartProducts = new ArrayList<ShoppingCartProduct>();
        shoppingcarts.forEach(cart -> shoppingcartProducts.addAll(cart.getProducts()));
        //wordt vervangen door:
        //var shoppingcartProducts = shoppingCartProductRepository.findByShoppingCart_Customer(thisCustomer);

        Map<Product, Long> timesBought = shoppingcartProducts.stream().collect(Collectors.groupingBy(ShoppingCartProduct::getProduct, Collectors.counting()));
        var mostBought = timesBought.entrySet().stream().sorted(Collections.reverseOrder(Map.Entry.comparingByValue())).limit(5).map(Map.Entry::getKey).toList();
        //.map(Product::getName).toList();

        return ResponseEntity.ok(new CustomerPageDTO(thisCustomer.getName(), thisCustomer.getEmail(), mostBought));
    }
}
