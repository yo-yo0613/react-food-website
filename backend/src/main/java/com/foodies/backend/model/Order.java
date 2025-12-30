package com.foodies.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private Long id;            // Spring Boot 產生的 ID
    private String userId;      // Firebase UID
    private String userEmail;
    private Double totalAmount;
    private String paymentMethod; // Cash, Line Pay, Credit Card
    private String status;        // PENDING, PAID
    private List<OrderItem> items; // 購物車內容
}