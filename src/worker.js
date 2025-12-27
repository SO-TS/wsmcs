/**
 * Cloudflare Workers API 端点
 * 提供 API 功能并处理特定路由，与静态站点配合使用
 */

import { Router } from 'itty-router';

// 创建路由器实例
const router = Router();

// API 响应格式化函数
const apiResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
};

// 基础健康检查端点
router.get('/api/health', () => {
  return apiResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'wsmcs-api'
  });
});

// 获取站点信息端点
router.get('/api/info', ({ env }) => {
  return apiResponse({
    name: 'WSMCS',
    environment: env.ENVIRONMENT || 'development',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 获取服务器状态的模拟端点（实际会连接到外部服务）
router.get('/api/status', async () => {
  // 这里可以集成真实的服务器状态检查
  return apiResponse({
    status: 'online',
    players: {
      online: Math.floor(Math.random() * 50) + 10, // 模拟在线玩家数
      max: 100
    },
    uptime: '99.9%',
    lastUpdate: new Date().toISOString()
  });
});

// 获取服务器列表端点
router.get('/api/servers', () => {
  return apiResponse({
    servers: [
      {
        id: 'survival',
        name: '生存服务器',
        description: '经典生存模式服务器',
        players: Math.floor(Math.random() * 30) + 5,
        maxPlayers: 50,
        status: 'online'
      },
      {
        id: 'bedwars',
        name: '起床战争服务器',
        description: 'PvP 为主的起床战争模式',
        players: Math.floor(Math.random() * 20) + 3,
        maxPlayers: 32,
        status: 'online'
      },
      {
        id: 'slimefun',
        name: '科技服务器',
        description: 'Slimefun 科技玩法服务器',
        players: Math.floor(Math.random() * 15) + 2,
        maxPlayers: 24,
        status: 'online'
      }
    ]
  });
});

// 简单的反馈提交端点
router.post('/api/feedback', async (request) => {
  try {
    const body = await request.json();
    
    // 这里可以处理反馈数据，例如保存到 KV 或发送到 Discord
    console.log('Received feedback:', body);
    
    return apiResponse({
      success: true,
      message: '反馈已提交成功'
    });
  } catch (error) {
    return apiResponse({
      success: false,
      message: '无效的请求数据'
    }, 400);
  }
});

// 处理 OPTIONS 请求（CORS 预检）
router.options('*', () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
});

// 为 API 路由添加前缀保护 - 如果请求以 /api/ 开头但未匹配任何路由
router.all('/api/*', () => {
  return apiResponse({
    error: 'API 端点不存在',
    code: 'NOT_FOUND'
  }, 404);
});

// 对于非 API 路由，返回 404 或交给静态站点处理
// 注意：这个 worker 应该与 workers-site 协同工作
router.all('*', async (request) => {
  // 对于非 API 请求，可以返回 404，因为静态内容由 workers-site 处理
  return new Response('Not Found', { status: 404 });
});

// 导出处理函数
export default {
  async fetch(request, env, ctx) {
    // 捕获并处理路由
    try {
      return await router.handle(request, env, ctx);
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
