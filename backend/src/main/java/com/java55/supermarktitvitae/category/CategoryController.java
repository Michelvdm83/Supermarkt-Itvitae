package com.java55.supermarktitvitae.category;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/categories")
@CrossOrigin("http://localhost:5173")
public class CategoryController {

    @GetMapping
    public Category[] getAll() {
        return Category.values();
    }
}
