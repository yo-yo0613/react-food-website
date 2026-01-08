# Foodies Backend (Spring Boot) 🔧

**簡介**

這是 Foodies 專案的 Spring Boot 後端，提供產品清單、訂單、留言與聯絡表單後端 API。

技術棧：Java 17+, Spring Boot, Spring Data JPA, PostgreSQL, Maven

---

## 主要特色 ✨

- REST API
  - `GET /api/products` — 取得所有產品（目前為記憶體產生的範例資料）
  - `POST /api/products` — 新增產品（回傳新增的 product）
  - `POST /api/orders` — 建立訂單（回傳處理後的訂單，含 `status`）
  - `GET /api/orders` — 查詢所有訂單（Admin 用）
  - `POST /api/messages` — 接收即時訊息（模擬處理）
  - `POST /api/contact` — 儲存聯絡訊息到 PostgreSQL
- 已開啟 CORS (`@CrossOrigin(origins = "*")`)，方便 React 前端整合

---

## 快速開始（本機） ▶️

Prerequisites:
- Java 17+
- Maven（或使用 repo 中的 `mvnw` / `mvnw.cmd`）
- PostgreSQL（本地或 Docker）— 若不使用 DB，`/api/contact` 功能會失效

設定環境變數（可選，預設於 `src/main/resources/application.properties`）：

- `DB_URL`（預設：`jdbc:postgresql://localhost:5432/postgres`）
- `DB_USERNAME`（預設：`postgres`）
- `DB_PASSWORD`（預設：`password`）

執行：

- Windows:
  - `./mvnw.cmd spring-boot:run`
- Linux / macOS:
  - `./mvnw spring-boot:run`
- 或使用 Maven：
  - `mvn spring-boot:run`

打包成 jar：

- `mvn clean package`
- 啟動 jar：`java -jar target/<your-app>.jar`

---

## Docker 使用 📦

Repo 已包含 `backend/Dockerfile`（multi-stage build）。

建置映像：

```bash
docker build -t food-backend:latest .
```

執行：

```bash
docker run -e DB_URL='jdbc:postgresql://host:5432/postgres' -e DB_USERNAME=postgres -e DB_PASSWORD=password -p 8080:8080 food-backend:latest
```

（在本機用 Docker Compose 或把 Postgres container 與此 container 連線）

---

## Kubernetes（範例） ☸️

- 有範例 `k8s/deployment.yaml`，其中 `image: food-backend:latest` 並以 `imagePullPolicy: Never` 設定為本地映像使用
- 建議上傳至 Container registry 並調整 `image` 欄位再部署到叢集

---

## 資料庫與 JPA 🗄️

- 使用 PostgreSQL（預設連線在 `src/main/resources/application.properties`）
- JPA 設定：`spring.jpa.hibernate.ddl-auto=update`（啟動時自動建立/更新表格）
- `ContactMessage` 有 JPA Entity，會存入 `contact_messages` 表

---

## API 範例（JSON） 📬

- 建立訂單（POST `/api/orders`）

Request:

```json
{
  "userId": "uid123",
  "userEmail": "a@b.com",
  "totalAmount": 99.0,
  "paymentMethod": "Credit Card",
  "items": [{ "name":"Food", "price":99.0, "quantity":1 }]
}
```

Response: 會回傳含 `id` 與 `status` 的訂單物件

- 聯絡表單（POST `/api/contact`）

Request:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "subject": "Hello",
  "message": "內容...",
  "userId": "guest"
}
```

Response:
- `200 OK` 並回傳儲存的 `ContactMessage` 物件
- `500` 時會回傳錯誤訊息

---

## 測試 🔍

- 執行單元測試：`mvn test` 或 `./mvnw test`

---

## 除錯提示 ⚠️

- 若遇到 `Connection refused`：確認 Postgres 是否啟動、`DB_URL` 是否正確、port（預設 `5432`）是否可連線。
- 若無法儲存聯絡訊息：檢查 `src/main/resources/application.properties` 的 DB 設定與資料庫權限。
- 若希望 product 永久儲存：需替換目前的記憶體 `ProductController` 為 JPA repository 實作。

---

## 貢獻 & 聯絡 🧑‍💻

- 歡迎 PR 或 issue。如果要我代寫：
  - 我可以把這份 README 寫入 `backend/README.md` 並幫你 commit。

---

*Generated on 2026-01-08*