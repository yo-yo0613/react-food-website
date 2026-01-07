package com.foodies.backend.model;

import jakarta.persistence.*; // ⭐ 1. 記得引入 JPA 套件
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // ⭐ 2. 告訴 Spring 這是要存入資料庫的「實體」
@Table(name = "products") // ⭐ 3. 指定資料庫裡的表名叫 "products"
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id // ⭐ 4. 標記這個欄位是「主鍵 (Primary Key)」
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ⭐ 5. 設定 ID 為自動遞增 (1, 2, 3...)
    private Long id;

    private String name;

    @Column(length = 1000) // (選用) 描述通常比較長，預設只有 255 字，這裡加大到 1000
    private String description;

    private String img;
    
    private Double price;
    
    private String category;
}