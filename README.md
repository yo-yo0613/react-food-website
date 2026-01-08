# 🍽️ Food Website Project | 全端美食網站專案

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

這是一個現代化的全端美食主題網站，結合了 **React** 前端互動介面與 **Spring Boot** 後端架構，並透過 **PostgreSQL** 進行資料持久化儲存。專案展示了完整的全端開發流程，包含響應式設計、動畫效果、API 串接以及資料庫操作。

![Website Screenshot](https://raw.githubusercontent.com/yo-yo0613/react-food-website/refs/heads/main/react-food-website/screenshots/home.png)

## 🔗 線上預覽 (Live Demo)

👉 **點擊前往體驗網站：[https://food-website-51067.web.app/](https://food-website-51067.web.app/)**

---

## 🛠️ 技術堆疊 (Tech Stack)

### 🎨 前端 (Frontend)
- **核心框架:** React 18, TypeScript
- **建置工具:** Vite
- **樣式設計:** Tailwind CSS
- **動畫特效:** Framer Motion
- **部署平台:** Firebase Hosting

### ⚙️ 後端 (Backend)
- **核心框架:** Spring Boot 3
- **程式語言:** Java 17+
- **ORM 框架:** Hibernate / Spring Data JPA
- **資料庫:** PostgreSQL
- **部署平台:** Render (Dockerized)

### 🚀 開發運維 (DevOps)
- **容器化:** Docker & Docker Compose
- **版本控制:** Git

---

## ✨ 主要功能 (Features)

* **RWD 響應式設計**: 完美支援手機、平板與桌機瀏覽。
* **流暢的 UI 動畫**: 使用 Framer Motion 打造頂級的使用者體驗。
* **完整的後端串接**: 前端透過 RESTful API 與後端溝通。
* **資料庫整合**: 實作聯絡表單功能，資料直接寫入 PostgreSQL 資料庫。
* **雲端部署架構**: 採用前後端分離部署 (Firebase + Render)。

---

## 🚀 專案啟動指南 (Getting Started)

本專案提供兩種啟動方式，您可以根據是否安裝 Docker 選擇適合的方法。

### 🔹 方法一：使用 Docker 快速啟動 (推薦)
*適合已安裝 Docker 的開發者，不需要手動配置 Java 或 Node.js 環境。*

1.  **Clone 專案**
    ```bash
    git clone [https://github.com/yo-yo0613/react-food-website.git](https://github.com/yo-yo0613/react-food-website.git)
    cd react-food-website
    ```

2.  **啟動服務 (使用 Docker Compose)**
    在專案根目錄執行：
    ```bash
    docker-compose up --build
    ```

3.  **完成！**
    * 前端頁面：`http://localhost:5173` (或是 `http://localhost:3000`)
    * 後端 API：`http://localhost:8080`
    * 資料庫：自動在 Container 中運行

---

### 🔸 方法二：手動安裝 (Manual Setup)
*適合想個別除錯前後端，或未安裝 Docker 的環境。*

#### 1. 資料庫準備 (Database)
請確保本機已安裝 **PostgreSQL**。
1.  建立一個新的資料庫，命名為 `food_db` (或其他你喜歡的名字)。
2.  記下你的 `username` (通常是 postgres) 和 `password`。

#### 2. 後端啟動 (Backend)
*需求環境：JDK 17+, Maven*

1.  進入後端目錄：
    ```bash
    cd backend
    ```
2.  **重要：修改設定檔**
    打開 `src/main/resources/application.properties`，填入你的資料庫資訊：
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/food_db
    spring.datasource.username=你的postgres帳號
    spring.datasource.password=你的postgres密碼
    ```
3.  啟動 Spring Boot：
    ```bash
    ./mvnw spring-boot:run
    ```
    *(看到 "Started Application" 即代表後端已在 Port 8080 運行)*

#### 3. 前端啟動 (Frontend)
*需求環境：Node.js (建議 v18+)*

1.  進入前端目錄 (開啟新的終端機視窗)：
    ```bash
    cd frontend
    ```
2.  安裝依賴套件：
    ```bash
    npm install
    ```
3.  啟動開發伺服器：
    ```bash
    npm run dev
    ```
    *(按住 Ctrl 點擊終端機顯示的 URL 即可開啟網頁)*

---

## 📂 專案結構 (Project Structure)

```text
/
├── frontend/          # React 前端程式碼
│   ├── src/           # 頁面元件、Hook 與樣式
│   ├── public/        # 靜態資源
│   └── package.json
│
├── backend/           # Spring Boot 後端程式碼
│   ├── src/           # Controller, Service, Repository
│   ├── Dockerfile     # 後端映像檔設定
│   └── pom.xml
│
├── docker-compose.yml # Docker 一鍵啟動設定
└── README.md          # 專案說明文件

📝 Author

Developed by [Yo-Yo] - 2026