package com.java55.supermarktitvitae.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping("/searchbar")
    public List<Product> searchProductByName(@RequestParam String contains) {

        return productRepository.findByNameContainsIgnoreCaseOrderByName(contains);
    }

    @GetMapping("/sales")
    public List<Product> getSales() {
        return productRepository.findBySalesPriceNotNull();
    }

    @GetMapping("/{name}")
    public ResponseEntity<Product> getProductByName(@PathVariable String name) {
        name = name.replace("-", " ");
        Optional<Product> product = productRepository.findByNameIgnoreCase(name);
        if (product.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product.get());
    }

    @PostMapping("/addNew")
    public ResponseEntity<Product> addNewProduct(@RequestBody Product newProduct,
                                                 UriComponentsBuilder ucb) {
        if (newProduct.getName() == null ||
                newProduct.getDescription() == null ||
                newProduct.getPrice() <= 0) {
            return ResponseEntity.badRequest().build();
        }
        if (productRepository.findByNameIgnoreCase(newProduct.getName()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        Product savedProduct = productRepository.save(newProduct);
        URI location = ucb.path("products/{name}").buildAndExpand(savedProduct.getName()).toUri();
        return ResponseEntity.created(location).body(savedProduct);
    }
}
