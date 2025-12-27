#!/bin/bash

# Cloudflare Workers 快速部署脚本

set -e

echo "🚀 开始部署到 Cloudflare Workers..."

# 检查环境变量
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "❌ 错误: 未设置 CLOUDFLARE_API_TOKEN 环境变量"
  echo "请设置: export CLOUDFLARE_API_TOKEN=your-token"
  exit 1
fi

# 获取部署环境参数
ENV=${1:-production}

echo "📦 正在构建项目..."
npm run build

if [ "$ENV" = "production" ]; then
    echo "🌐 部署到生产环境..."
    npm run deploy:prod
else
    echo "❓ 未知环境: $ENV"
    echo "用法: ./deploy.sh [production]"
    exit 1
fi
echo "✅ 部署完成！"
echo "访问: https://wsmcs.top"
