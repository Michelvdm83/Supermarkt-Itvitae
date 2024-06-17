package com.java55.supermarktitvitae.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return productRepository.findBySalesPriceNotNullOrderByName();
    }

    @GetMapping("/{name}")
    public ResponseEntity<Product> getProductByName(@PathVariable String name) {
        name = name.replace("-", " ");
        Optional<Product> product = productRepository.findByNameIgnoreCase(name);
        if (product.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product.get());
    }

    @GetMapping("/bestsales")
    public List<Product> getFiveBestSales() {

        List<Product> sales = productRepository.findBySalesPriceNotNullOrderByName();
        
        for (int inner = 0; inner < sales.size(); inner++) {
            Product currentProduct = sales.get(inner);
            double priceDifferenceCurrentProduct = currentProduct.getPrice() - currentProduct.getSalesPrice();

            for (int outer = 0; outer < sales.size(); outer++) {
                if (outer == inner) continue;

                Product outerProduct = sales.get(outer);
                double priceDifferenceOuterProduct = outerProduct.getPrice() - outerProduct.getSalesPrice();

                if (priceDifferenceCurrentProduct > priceDifferenceOuterProduct) {
                    sales.remove(currentProduct);
                    sales.add(outer, currentProduct);
                }
            }
        }

        return sales.subList(sales.size() - 5, sales.size());

    }

}
