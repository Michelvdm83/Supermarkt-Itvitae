package com.java55.supermarktitvitae.product;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping("/searchbar")
    public List<Product> searchProductByName(@RequestParam String contains) {

        return productRepository.findByNameContainsIgnoreCase(contains);

    }

    @GetMapping("/sales")
    public List<Product> getSales() {
        return productRepository.findBySalesPriceNotNull();
    }

}
