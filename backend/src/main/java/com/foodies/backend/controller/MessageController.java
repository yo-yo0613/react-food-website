package com.foodies.backend.controller;

import com.foodies.backend.model.Message;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*") // 允許前端連線
public class MessageController {

    @PostMapping
    public String receiveMessage(@RequestBody Message msg) {
        // 這裡模擬處理訊息 (例如印出來，或是未來可以寫入資料庫/寄信)
        System.out.println("收到新訊息！");
        System.out.println("來自: " + msg.getName() + " (" + msg.getEmail() + ")");
        System.out.println("內容: " + msg.getMessage());

        return "Message received successfully";
    }
}