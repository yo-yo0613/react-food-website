# 1. 建置階段 (Build Stage) - 用 Maven 把程式碼打包成 Jar 檔
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# 跳過測試直接打包，加速部署
RUN mvn clean package -DskipTests

# 2. 執行階段 (Run Stage) - 用輕量級 Java 執行環境跑 Jar 檔
FROM eclipse-temurin:21-jdk
WORKDIR /app
# 從上面的 build 階段把打包好的 jar 檔複製過來
COPY --from=build /app/target/*.jar app.jar
# 開放 8080 port
EXPOSE 8080
# 啟動指令
ENTRYPOINT ["java", "-jar", "app.jar"]