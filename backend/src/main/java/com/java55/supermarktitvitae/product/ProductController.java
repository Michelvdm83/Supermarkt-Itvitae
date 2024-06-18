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

    @PatchMapping("/update/{name}")
    public ResponseEntity<?> updateProduct(@PathVariable String name, @RequestBody ProductPatchDTO productPatchDTO) {
        if (name == null || name.isBlank()) {
            return ResponseEntity.badRequest().body("name of product can't be empty");
        }
        var possibleProduct = productRepository.findByNameIgnoreCase(name);
        if (possibleProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product productToUpdate = possibleProduct.get();
//        if (productPatchDTO.newName() != null && !productPatchDTO.newName().isBlank()) {
//            productToUpdate.setName(productPatchDTO.newName());
//        }
        if (productPatchDTO.description() != null && !productPatchDTO.description().isBlank()) {
            productToUpdate.setDescription(productPatchDTO.description());
        }
        if (productPatchDTO.price() != null) {
            productToUpdate.setPrice(productPatchDTO.price());
        }
        if (productPatchDTO.salesPrice() != null) {
            productToUpdate.setSalesPrice(productPatchDTO.salesPrice());
        }

        return ResponseEntity.ok(productRepository.save(productToUpdate));
    }

    @GetMapping("/bestsales")
    public List<Product> getFiveBestSales() {

        List<Product> sales = productRepository.findBySalesPriceNotNullOrderByName();

        for (int inner = 0; inner < sales.size(); inner++) {
            Product currentProduct = sales.get(inner);
            double priceDifferenceCurrentProduct = currentProduct.getPrice() - currentProduct.getSalesPrice();

            for (int outer = inner + 1; outer < sales.size(); outer++) {
                Product outerProduct = sales.get(outer);
                double priceDifferenceOuterProduct = outerProduct.getPrice() - outerProduct.getSalesPrice();

                if (priceDifferenceCurrentProduct < priceDifferenceOuterProduct) {
                    Product temp = sales.get(inner);
                    sales.set(inner, sales.get(outer));
                    sales.set(outer, temp);

                    currentProduct = outerProduct;
                    priceDifferenceCurrentProduct = priceDifferenceOuterProduct;

                }
            }
        }

        return sales.subList(0, 5);

    }

}
