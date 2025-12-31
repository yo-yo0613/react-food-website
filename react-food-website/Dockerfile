# 第一階段：Build 環境 (用 Node.js 打包)
FROM node:24-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 第二階段：Run 環境 (用 Nginx 執行)
FROM nginx:alpine
# 把第一階段打包好的 dist (或 build) 資料夾複製到 Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# 複製我們自定義的 nginx 設定檔
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]