// src/config.js

// 1. 偵測目前是不是在 Docker/K8s 環境 (透過網址判斷)
// 如果網址是 localhost:30000 (業主的電腦)，我們就強制用相對路徑
const isLocalK8s = window.location.hostname === 'localhost' && window.location.port === '30000';

// 2. 設定 API 網址
// 如果是 K8s -> 用空字串 '' (代表使用相對路徑 /api/...)
// 如果不是 -> 用環境變數裡的 Render 網址 (https://food-backend...)
export const API_URL = isLocalK8s 
  ? '' 
  : (import.meta.env.VITE_API_BASE_URL || 'https://food-backend-ehke.onrender.com');

export default API_URL;