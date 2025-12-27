@echo off
REM Cloudflare Workers 快速部署脚本（Windows）

setlocal enabledelayedexpansion

echo 🚀 开始部署到 Cloudflare Workers...

REM 检查环境变量
if not defined CLOUDFLARE_API_TOKEN (
  echo ❌ 错误: 未设置 CLOUDFLARE_API_TOKEN 环境变量
  echo 请设置: set CLOUDFLARE_API_TOKEN=your-token
  exit /b 1
)

REM 获取部署环境参数
set ENV=%1
if "!ENV!"=="" set ENV=production

echo 📦 正在构建项目...
call npm run build

if "!ENV!"=="production" (
  echo 🌐 部署到生产环境...
  call npm run deploy:prod
) else (
  echo ❓ 未知环境: !ENV!
  echo 用法: deploy.bat [production]
  exit /b 1
)

echo ✅ 部署完成！
echo 访问: https://wsmcs.top

endlocal
