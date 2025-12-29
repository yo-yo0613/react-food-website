package com.foodies.backend;

import com.foodies.backend.model.Product;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // 允許前端連線
public class ProductController {

    @GetMapping
    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();

        // 假資料 (對應你前端的圖片)
        products.add(new Product(1L, "Breakfast Special", "Fresh eggs, bacon, toast...", "/images/food1.png", 12.99, "breakfast"));
        products.add(new Product(2L, "Lunch Combo", "Grilled chicken with fresh salad...", "/images/food2.png", 15.99, "lunch"));
        products.add(new Product(3L, "Dinner Delight", "Premium steak with roasted vegetables", "/images/food3.png", 24.99, "dinner"));
        products.add(new Product(4L, "Sweet Pancakes", "Fluffy pancakes with maple syrup", "/images/food1.png", 9.99, "breakfast"));
        
        return products;
    }
}