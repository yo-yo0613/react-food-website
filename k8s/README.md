# Kubernetes 部署說明 ☸️

此目錄包含 Foodies 專案的 Kubernetes 範例資源（`deployment.yaml`），用於在 k8s 叢集內部署後端（Spring Boot）與前端（React + Nginx）。

---

## 目標與架構 🔧

- 後端：部署為 `backend` Deployment + `backend-service`（ClusterIP，對內提供 8080）。
- 前端：部署為 `frontend` Deployment + `frontend-service`（NodePort，對外開放 30000，容器為 Nginx，對外 port 80）。
- 預設 `imagePullPolicy: Never`（假設你在本地建好 image 並使用本地映像），上傳 registry 後請改為 `IfNotPresent` 或 `Always` 並修改 `image`。

---

## 快速操作指南 ▶️

1. 建置映像（在專案根目錄或各自目錄下）：

   - Backend（在 `backend/`）：
     ```bash
     cd backend
     docker build -t food-backend:latest .
     ```

   - Frontend（在 `react-food-website/`）：
     ```bash
     cd react-food-website
     docker build -t food-frontend:latest .
     ```

2. 如果使用本地 k8s（minikube 或 kind）

   - Minikube: 載入本地 image
     ```bash
     # minikube 使用者
     minikube image load food-backend:latest
     minikube image load food-frontend:latest
     ```

   - Kind: 載入本地 image
     ```bash
     kind load docker-image food-backend:latest
     kind load docker-image food-frontend:latest
     ```

3. 套用 k8s 資源：

   ```bash
   kubectl apply -f k8s/deployment.yaml
   ```

4. 確認 Pod 與 Service：

   ```bash
   kubectl get deployments,services,pods -n default
   ```

5. 前端對外訪問：

   - 若使用 NodePort（`nodePort: 30000` 在 `deployment.yaml`）：
     打開瀏覽器並訪問 `http://<NODE_IP>:30000`（若本機是 minikube，可用 `minikube service frontend-service --url`）。

   - 或使用 `kubectl port-forward`（快速檢查）：
     ```bash
     kubectl port-forward svc/frontend-service 8080:80
     # 然後開 http://localhost:8080
     ```

---

## 調整 Image 與 Pull Policy 🖼️

- 若你要使用遠端 registry（Docker Hub / GCR / ECR 等）：
  1. Tag 並推上 registry：`docker tag food-backend:latest <your-repo>/food-backend:tag` 與 `docker push ...`
  2. 修改 `k8s/deployment.yaml` 的 `image` 為 `<your-repo>/food-backend:tag` 並把 `imagePullPolicy` 改為 `IfNotPresent` 或 `Always`。
  3. 若 registry 為私有 registry，請建立 `Secret` 並在 deployment 中參考 `imagePullSecrets`。

示例：

```yaml
containers:
  - name: backend
    image: <your-repo>/food-backend:1.0.0
    imagePullPolicy: IfNotPresent
```

---

## 環境變數與機密（DB/Secrets）🔐

- `backend` 需要 PostgreSQL 連線資訊（`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`）。不要把密碼硬編在 yaml 檔中，建議使用 `Secret`。示例流程：

```bash
kubectl create secret generic backend-db-secret \
  --from-literal=DB_URL=jdbc:postgresql://postgres-service:5432/postgres \
  --from-literal=DB_USERNAME=postgres \
  --from-literal=DB_PASSWORD=yourpassword
```

並在 Deployment 中引用：

```yaml
env:
  - name: DB_URL
    valueFrom:
      secretKeyRef:
        name: backend-db-secret
        key: DB_URL
  - name: DB_USERNAME
    valueFrom:
      secretKeyRef:
        name: backend-db-secret
        key: DB_USERNAME
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: backend-db-secret
        key: DB_PASSWORD
```

---

## 常見問題與除錯 ⚠️

- Pod CrashLoopBackOff：查看 `kubectl logs <pod>` 與 `kubectl describe pod <pod>`，檢查環境變數與資料庫連線。
- Service 無法連線：確認 Service selector 與 Pod label 是否吻合，並檢查 targetPort。
- 前端顯示 502/504：確認 Nginx 已正確 proxy 到 `backend-service`（service 名稱應與 `k8s/deployment.yaml` 一致）。

---

## 建議與下一步 💡

- 建議：把 `deployment.yaml` 拆成 `deployment` / `service` / `secret` 等多個檔案，便於管理與 gitOps 自動化。
- 若要在 CI/CD 中部署：使用 GitHub Actions / GitLab CI 建置映像、推到 registry，並用 `kubectl` 或 Helm 部署至叢集。

---

*Generated on 2026-01-08*
