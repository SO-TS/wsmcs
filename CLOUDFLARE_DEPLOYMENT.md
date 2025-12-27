# Cloudflare Workers 部署指南

本项目已配置为支持 Cloudflare Workers 部署。

## 前置要求

1. Node.js 20.19.0+ 或 22.12.0+
2. Cloudflare 账户（[免费注册](https://dash.cloudflare.com/sign-up)）
3. 已关联的域名

## 安装依赖

```bash
npm install
```

## 本地开发

### 在本地运行 Vite 开发服务器
```bash
npm run dev
```

### 在本地测试 Cloudflare Workers
```bash
npm run dev:cloudflare
```

这将在 `http://localhost:8787` 启动本地 Workers 环境。

## 构建

### 构建静态资源
```bash
npm run build
```

构建输出将保存到 `dist/` 目录。

### 测试 Workers 构建
```bash
npm run test:cloudflare
```

这将执行干运行（dry-run），不实际部署任何更改。

## 部署

### 首次部署前的身份验证

```bash
npx wrangler login
```

这将打开浏览器让你授权 Wrangler 访问你的 Cloudflare 账户。

### 部署到生产环境

```bash
npm run deploy:prod
```

或全步骤：
```bash
npm run build && npm run deploy:prod
```

### 部署到暂存环境

```bash
npm run deploy:prod
```

### 快速部署（默认环境）

```bash
npm run deploy:cloudflare
```

## 配置文件说明

### wrangler.toml

这是 Cloudflare Workers 的主要配置文件：

- **name**: Workers 项目名称
- **main**: Workers 入口点
- **compatibility_date**: 兼容性日期（使用最新稳定 API）
- **env**: 环境配置（生产/暂存）
- **build**: 构建命令配置
- **site**: 静态网站托管配置

### src/worker.js

Workers 脚本，处理：
- HTTP 请求路由
- 缓存策略管理
- 安全响应头添加
- 性能优化

### vite.cloudflare.config.js

针对 Cloudflare Workers 优化的 Vite 配置。

## 环境变量

在 `wrangler.toml` 中可以配置环境特定的变量：

```toml
[env.production]
vars = { ENVIRONMENT = "production" }
```

在 worker 中访问：
```javascript
export default {
  async fetch(request, env, ctx) {
    console.log(env.ENVIRONMENT);
  }
}
```

## 缓存策略

项目已配置以下缓存策略：

| 资源类型 | 缓存时间 | 策略 |
|---------|---------|------|
| 图片 (.png, .jpg, .gif 等) | 14 天 | immutable |
| 字体 (.woff, .ttf 等) | 30 天 | immutable |
| JavaScript/CSS | 1 年 | immutable |
| HTML | 1 小时 | must-revalidate |

## 安全响应头

以下安全响应头已自动添加：

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 故障排除

### 认证失败

```bash
npx wrangler logout
npx wrangler login
```

### 查看日志

```bash
# 查看实时日志
wrangler tail

# 查看特定路由的日志
wrangler tail --format json
```

### 回滚部署

```bash
wrangler publish --compatibility-date [DATE]
```

## 进阶配置

### 添加 KV 存储

在 `wrangler.toml` 中：
```toml
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-id"
```

### 添加 D1 数据库

```toml
[[d1_databases]]
binding = "DB"
database_name = "wsmcs-db"
```

### 添加触发器

```toml
[triggers]
crons = ["0 0 * * *"]
```

## 更多资源

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [部署最佳实践](https://developers.cloudflare.com/workers/platform/deployment-tiers/)

## 支持

如有问题，请查看 Cloudflare Workers 社区：
- [Discord 社区](https://discord.gg/cloudflaredev)
- [论坛](https://community.cloudflare.com/)
