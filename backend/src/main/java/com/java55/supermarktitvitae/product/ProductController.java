package com.java55.supermarktitvitae.product;

import com.java55.supermarktitvitae.category.Category;
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

    @GetMapping("/names")
    public List<String> getNamesFromSearch(@RequestParam String contains) {
        return productRepository.findByNameContainsIgnoreCaseOrderByName(contains).stream().map(Product::getName).toList();
    }

    @GetMapping("/sales")
    public List<Product> getSales() {
        return productRepository.findBySalesPriceNotNullOrderByCategory();
    }

    @GetMapping("/{name}")
    public ResponseEntity<Product> getProductByName(@PathVariable String name) {
        name = name.replace("-", " ");
        Optional<Product> product = productRepository.findByNameIgnoreCase(name);
        if (product.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product.get());
    }

    @GetMapping("/category/{categoryName}")
    public List<Product> getProductsByCategory(@PathVariable String categoryName) {
        Category category = Category.valueOf(categoryName.toUpperCase());
        return productRepository.findByCategory(category);
    }

    @PatchMapping("/update/{name}")
    public ResponseEntity<Product> updateProduct(@PathVariable String name, @RequestParam Boolean updateSales, @RequestBody ProductPatchDTO productPatchDTO) {

        if (name == null || name.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        var possibleProduct = productRepository.findByNameIgnoreCase(name);
        if (possibleProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product productToUpdate = possibleProduct.get();

        if (productPatchDTO.description() != null && !productPatchDTO.description().isBlank()) {
            productToUpdate.setDescription(productPatchDTO.description().trim());
        }
        if (productPatchDTO.price() != null && productPatchDTO.price() > 0) {
            productToUpdate.setPrice(productPatchDTO.price());
        }
        if (updateSales) {
            if (productPatchDTO.salesPrice() == null || productPatchDTO.salesPrice() > 0) {
                productToUpdate.setSalesPrice(productPatchDTO.salesPrice());
            }
        }

        return ResponseEntity.ok(productRepository.save(productToUpdate));
    }

    @DeleteMapping("/remove/{name}")
    public ResponseEntity<?> removeProduct(@PathVariable String name) {
        if (name == null || name.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        var possibleProduct = productRepository.findByNameIgnoreCase(name);
        if (possibleProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var productToDelete = possibleProduct.get();
        productToDelete.setActive(false);
        productRepository.save(productToDelete);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bestsales")
    public List<Product> getFiveBestSales() {

        List<Product> sales = productRepository.findBySalesPriceNotNullOrderByCategory();

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
        newProduct.setActive(true);
        Product savedProduct = productRepository.save(newProduct);
        URI location = ucb.path("products/{name}").buildAndExpand(savedProduct.getName()).toUri();
        return ResponseEntity.created(location).body(savedProduct);
    }
}
