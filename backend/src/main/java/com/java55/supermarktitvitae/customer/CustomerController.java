package com.java55.supermarktitvitae.customer;

import com.java55.supermarktitvitae.product.Product;
import com.java55.supermarktitvitae.security.AuthDTO;
import com.java55.supermarktitvitae.security.JwtService;
import com.java55.supermarktitvitae.security.JwtTokenDTO;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProduct;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductMostBoughtDTO;
import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "${supermarktitvitae.cors}")
public class CustomerController {
    private final CustomerRepository customerRepository;
    private final ShoppingCartProductRepository shoppingCartProductRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO) {
        if (authDTO.email() == null || authDTO.password() == null) {
            return ResponseEntity.badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "email en wachtwoord zijn nodig"
                    ));
        }

        if (!(customerRepository.existsById(authDTO.email())
                && passwordEncoder.matches(authDTO.password(), customerRepository.getReferenceById(authDTO.email()).getPassword()))) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "email of wachtwoord incorrect"
                    ));
        }

        Customer customer = customerRepository.getReferenceById(authDTO.email());

        return ResponseEntity.ok(new JwtTokenDTO(
                jwtService.generateTokenForCustomer(authDTO.email()),
                customer.getName(),
                customer.getRole()
        ));
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody Customer newCustomer, UriComponentsBuilder ucb) {

        var userName = newCustomer.getEmail();
        var possibleCustomer = customerRepository.findByEmailIgnoreCase(userName);

        if (possibleCustomer.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "Er bestaat al een account met dit e-mailadres."
                    ));
        } else if (newCustomer.getPassword().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "Voer een wachtwoord in."
                    ));
        } else if (newCustomer.getName().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "Voer een naam in."
                    ));
        } else if (newCustomer.getEmail().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "Voer een geldig e-mailadres in."
                    ));
        }

        newCustomer.setPassword(passwordEncoder.encode(newCustomer.getPassword()));

        customerRepository.save(newCustomer);
        URI locationOfNewUser = ucb
                .path("customers/{username}")
                .buildAndExpand(newCustomer.getUsername())
                .toUri();
        return ResponseEntity.created(locationOfNewUser).body(newCustomer);
    }

    @GetMapping("page-info")
    public ResponseEntity<CustomerPageDTO> getInfo(Authentication authentication) {
        Customer thisCustomer = (Customer) authentication.getPrincipal();


        var shoppingcartProducts = shoppingCartProductRepository.findByShoppingCart_CustomerAndShoppingCart_IsPayedTrueAndProduct_IsActiveTrue(thisCustomer);

        Map<Product, Long> timesBought = shoppingcartProducts.stream().collect(Collectors.groupingBy(ShoppingCartProduct::getProduct, Collectors.counting()));
        var mostBought = timesBought.entrySet().stream().sorted(Collections.reverseOrder(Map.Entry.comparingByValue())).limit(5).map(Map.Entry::getKey).toList();

        List<ShoppingCartProductMostBoughtDTO> mostBoughtByQuantity = new ArrayList<>();
        mostBought.forEach(product -> {
            var cartProductOfCurrent = shoppingcartProducts.stream().filter(p -> p.getProduct().getName().equals(product.getName())).toList();
            var mostBoughtBy = cartProductOfCurrent.stream()
                    .collect(Collectors.groupingBy(ShoppingCartProduct::getQuantity, Collectors.counting()))
                    .entrySet().stream().sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                    .map(Map.Entry::getKey).findFirst().orElse(0);
            mostBoughtByQuantity.add(new ShoppingCartProductMostBoughtDTO(product.getName(), mostBoughtBy));
        });


        return ResponseEntity.ok(new CustomerPageDTO(CustomerDTO.from(thisCustomer), mostBoughtByQuantity));
    }
}
