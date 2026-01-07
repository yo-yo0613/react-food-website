package com.foodies.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages") // 資料庫裡的表名
@Data
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String subject;

    @Column(length = 2000) // 設定訊息欄位可以長一點
    private String message;

    private String userId; // 紀錄是誰傳的 (guest 或 uid)

    private LocalDateTime createdAt;

    // 自動在寫入前填入當下時間
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}