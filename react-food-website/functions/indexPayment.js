// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// 初始化 Stripe (請去 Stripe 官網註冊拿 "Secret Key" sk_test_...)
const stripe = require("stripe")("pk_test_51SeIyEPlWwyWz35kolNXt2Cyonymlx24PSzIIvu41SGPzLJHhq70EEriaz9oIBUyGmwDj88OVnogR5K8nBhDEIZt00XJHOLGRv");

admin.initializeApp();

// 1. 建立 Stripe 支付意圖 (PaymentIntent)
exports.createStripePaymentIntent = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(400).send("Please send a POST request");
    }

    try {
      const { amount, currency = "usd" } = req.body;

      // 建立 PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe 單位是 "分" (cent)，所以要 * 100
        currency: currency,
        automatic_payment_methods: { enabled: true }, // 啟用自動付款方式
      });

      // 回傳 client_secret 給前端，讓前端去完成付款
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).send({ error: error.message });
    }
  });
});

// 2. Line Pay 請求 (因為 Line Pay 比較複雜，這裡寫個架構示意)
exports.createLinePayRequest = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        // 你需要申請 Line Pay Merchant ID 才能實作這裡
        // 流程是：呼叫 Line Pay API -> 拿到付款網址 -> 回傳給前端
        res.status(200).send({ message: "Line Pay backend ready but needs keys" });
    });
});