package com.foodies.backend;

import com.foodies.backend.model.Product;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // 允許所有來源連線
public class ProductController {

    private List<Product> products = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    public ProductController() {
        initData();
    }

    // ⭐ 這裡產生 21 筆資料，順序與內容必須跟前端 ProductDetail 一樣 ⭐
    private void initData() {
        // --- Breakfast (5 items) ---
        products.add(new Product(counter.incrementAndGet(), "Breakfast Special", "Fresh eggs, bacon, toast, and seasonal fruits.", "/images/food1.png", 12.99, "breakfast"));
        products.add(new Product(counter.incrementAndGet(), "Sweet Pancakes", "Fluffy pancakes served with honey and fresh berries.", "/images/breakfast1.png", 9.99, "breakfast"));
        products.add(new Product(counter.incrementAndGet(), "French Toast", "Classic french toast with powdered sugar and syrup.", "/images/breakfast2.png", 8.50, "breakfast"));
        products.add(new Product(counter.incrementAndGet(), "Morning Bagel", "Toasted bagel with cream cheese and smoked salmon.", "/images/breakfast3.png", 7.99, "breakfast"));
        products.add(new Product(counter.incrementAndGet(), "Omelette Delight", "Three-egg omelette with cheese, ham, and peppers.", "/images/breakfast4.png", 10.50, "breakfast"));

        // --- Lunch (5 items) ---
        products.add(new Product(counter.incrementAndGet(), "Lunch Combo", "Grilled chicken salad served with daily soup.", "/images/food2.png", 15.99, "lunch"));
        products.add(new Product(counter.incrementAndGet(), "Fresh Salad", "Mixed greens with organic vegetables and house dressing.", "/images/lunch1.png", 8.99, "lunch"));
        products.add(new Product(counter.incrementAndGet(), "Club Sandwich", "Triple-decker sandwich with turkey, bacon, and lettuce.", "/images/lunch2.png", 11.50, "lunch"));
        products.add(new Product(counter.incrementAndGet(), "Vegan Wrap", "Tortilla wrap filled with hummus, avocado, and veggies.", "/images/lunch3.png", 9.50, "lunch"));
        products.add(new Product(counter.incrementAndGet(), "Chicken Pesto", "Grilled chicken breast with basil pesto sauce.", "/images/dessert2.png", 13.99, "lunch"));

        // --- Dinner (5 items) ---
        products.add(new Product(counter.incrementAndGet(), "Dinner Delight", "Premium steak cooked to perfection with roasted veggies.", "/images/food3.png", 24.99, "dinner"));
        products.add(new Product(counter.incrementAndGet(), "Seafood Pasta", "Creamy alfredo pasta with shrimp and scallops.", "/images/dinner1.png", 18.99, "dinner"));
        products.add(new Product(counter.incrementAndGet(), "BBQ Ribs", "Slow-cooked pork ribs with homemade BBQ sauce.", "/images/dinner2.png", 21.50, "dinner"));
        products.add(new Product(counter.incrementAndGet(), "Grilled Salmon", "Fresh salmon fillet with lemon butter glaze.", "/images/dinner3.png", 22.99, "dinner"));
        products.add(new Product(counter.incrementAndGet(), "Mushroom Risotto", "Italian rice dish cooked with wild mushrooms and parmesan.", "/images/dinner4.png", 16.50, "dinner"));

        // --- Desserts (3 items) ---
        products.add(new Product(counter.incrementAndGet(), "HodDessert", "Our signature dessert with fresh cream and fruits.", "/images/dessert1.png", 5.99, "desserts"));
        products.add(new Product(counter.incrementAndGet(), "Chocolate Cake", "Rich and moist chocolate cake with ganache.", "/images/dessert4.png", 6.50, "desserts"));
        products.add(new Product(counter.incrementAndGet(), "Lemon Tart", "Zesty lemon curd in a buttery pastry shell.", "/images/dessert3.png", 5.50, "desserts"));

        // --- Drinks (3 items) ---
        products.add(new Product(counter.incrementAndGet(), "Fruit Smoothie", "Blend of mango, strawberry, and banana.", "/images/drink1.png", 4.99, "drinks"));
        products.add(new Product(counter.incrementAndGet(), "Iced Coffee", "Cold brew coffee with a splash of milk.", "/images/drink2.png", 3.99, "drinks"));
        products.add(new Product(counter.incrementAndGet(), "Green Tea", "Premium Japanese matcha green tea.", "/images/drink3.png", 2.99, "drinks"));
    }

    // --- API 區塊 ---

    @GetMapping
    public List<Product> getAllProducts() {
        return products;
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        product.setId(counter.incrementAndGet());
        if (product.getImg() == null || product.getImg().isEmpty()) {
            product.setImg("/images/food1.png");
        }
        products.add(product);
        return product;
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        products.removeIf(p -> p.getId().equals(id));
    }
}