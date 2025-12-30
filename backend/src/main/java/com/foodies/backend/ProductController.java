package com.foodies.backend;

import com.foodies.backend.model.Product;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // 允許 React 連線
public class ProductController {

    // 1. 把 List 移到外面變成「成員變數」，這樣資料才會被保存下來 (直到你關閉程式)
    private List<Product> products = new ArrayList<>();
    // 用來產生唯一的 ID
    private final AtomicLong counter = new AtomicLong();

    // 建構子：程式啟動時先塞入預設資料
    public ProductController() {
        initData();
    }

    private void initData() {
        products.add(new Product(counter.incrementAndGet(), "Breakfast Special", "Fresh eggs, bacon, toast...", "/images/food1.png", 12.99, "breakfast"));
        products.add(new Product(counter.incrementAndGet(), "Lunch Combo", "Grilled chicken salad...", "/images/food2.png", 15.99, "lunch"));
        products.add(new Product(counter.incrementAndGet(), "Dinner Delight", "Premium steak...", "/images/food3.png", 24.99, "dinner"));
        products.add(new Product(counter.incrementAndGet(), "Sweet Pancakes", "Fluffy pancakes...", "/images/food1.png", 9.99, "breakfast"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/drink1.png",1.13,"drinks"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/drink2.png",2.50,"drinks"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/lunch1.png",23.75,"lunch"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/lunch2.png",45.00,"lunch"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/lunch3.png",67.89,"lunch"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/dinner1.png",34.56,"dinner"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/dinner2.png",78.90,"dinner"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/dinner3.png",90.12,"dinner"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/dinner4.png",30.10,"dinner"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/dessert1.png",11.11,"desserts"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/dessert2.png",22.22,"desserts"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/dessert3.png",33.33,"desserts"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/dessert4.png",44.44,"desserts"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/breakfast1.png",55.55,"breakfast"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/breakfast2.png",66.66,"breakfast"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/breakfast3.png",77.77,"breakfast"));
        products.add(new Product(counter.incrementAndGet(), "","","/images/breakfast4.png",88.88,"breakfast"));
    }

    // --- API 區塊 ---

    // 1. 取得所有商品 (GET)
    @GetMapping
    public List<Product> getAllProducts() {
        return products;
    }

    // 2. 新增商品 (POST)
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        // 設定新的 ID
        product.setId(counter.incrementAndGet());
        // 如果前端沒有傳圖片，給預設圖
        if (product.getImg() == null || product.getImg().isEmpty()) {
            product.setImg("/images/food1.png");
        }
        // 加入列表
        products.add(product);
        return product;
    }

    // 3. 刪除商品 (DELETE)
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        // 使用 removeIf 移除 ID 符合的商品
        products.removeIf(p -> p.getId().equals(id));
    }
}