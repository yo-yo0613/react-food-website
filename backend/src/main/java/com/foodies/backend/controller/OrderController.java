package com.foodies.backend.controller;

import com.foodies.backend.model.Order;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private List<Order> orders = new ArrayList<>(); // 模擬資料庫
    private final AtomicLong counter = new AtomicLong();

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        // 1. 產生訂單編號
        order.setId(counter.incrementAndGet());

        // 2. 處理付款邏輯 (模擬)
        String method = order.getPaymentMethod();
        Double amount = order.getTotalAmount();

        System.out.println("收到訂單: " + order.getId() + ", 金額: " + amount + ", 方式: " + method);

        if ("Cash".equalsIgnoreCase(method)) {
            // 現金：狀態是「待付款」
            order.setStatus("PENDING_CASH");
        
        } else if ("Credit Card".equalsIgnoreCase(method)) {
            // 信用卡：模擬呼叫銀行 API (這裡直接當作成功)
            // 實際上這裡會去呼叫 Stripe/Visa API
            if (amount > 0) {
                order.setStatus("PAID");
            } else {
                order.setStatus("FAILED");
            }

        } else if ("Line Pay".equalsIgnoreCase(method)) {
            // Line Pay：模擬付款成功
            order.setStatus("PAID");
        } else {
            order.setStatus("UNKNOWN");
        }

        // 3. 存入記憶體
        orders.add(order);
        
        return order; // 回傳處理後的訂單 (包含狀態)
    }

    // 查詢所有訂單 (給 Admin 看)
    @GetMapping
    public List<Order> getAllOrders() {
        return orders;
    }
}