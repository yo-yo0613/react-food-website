package com.foodies.backend.controller;

import com.foodies.backend.model.ContactMessage;
import com.foodies.backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // ⭐ 重要：允許你的 React 前端呼叫
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping // 對應前端的 POST 請求
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage message) {
        try {
            // 存入 PostgreSQL
            ContactMessage savedMsg = contactRepository.save(message);
            return ResponseEntity.ok(savedMsg);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}