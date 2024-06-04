package com.java55.supermarktitvitae;

import com.java55.supermarktitvitae.product.Product;
import com.java55.supermarktitvitae.product.Category;

import com.java55.supermarktitvitae.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0 ) {
            Product product1 = new Product("Banaan", 3.20, "een tros banenen uit..." ,Category.FRUIT, 2.80);
            Product product2 = new Product("kaas", 5.60, "500 gram oude kaas" ,Category.ZUIVEL, 5.00);

            productRepository.saveAll(List.of(product1, product2));
        }
    }
}

