/**
 * Cloudflare Workers 入口点
 * 处理所有 HTTP 请求并提供适当的响应
 */

import { Router } from 'itty-router';

const router = Router();

// 缓存配置
const cacheConfig = {
  images: 'public, max-age=1209600, immutable', // 14 天
  fonts: 'public, max-age=2592000, immutable', // 30 天
  scripts: 'public, max-age=31536000, immutable', // 1 年
  styles: 'public, max-age=31536000, immutable', // 1 年
  html: 'public, max-age=3600, must-revalidate', // 1 小时
  default: 'public, max-age=3600, must-revalidate' // 默认 1 小时
};

/**
 * 获取资源的缓存策略
 */
function getCacheControl(url) {
  const path = new URL(url).pathname;

  if (/\.(png|jpg|jpeg|gif|svg|webp|avif)$/i.test(path)) {
    return cacheConfig.images;
  }
  if (/\.(woff|woff2|ttf|otf|eot)$/i.test(path)) {
    return cacheConfig.fonts;
  }
  if (/\.js$/.test(path)) {
    return cacheConfig.scripts;
  }
  if (/\.css$/.test(path)) {
    return cacheConfig.styles;
  }
  if (/\.html$/.test(path) || path === '/') {
    return cacheConfig.html;
  }

  return cacheConfig.default;
}

/**
 * 添加安全响应头
 */
function addSecurityHeaders(response) {
  const headers = new Headers(response.headers);

  // 安全策略
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // CORS 配置（如需要）
  // headers.set('Access-Control-Allow-Origin', '*');
  // headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  // 性能优化
  headers.set('Server', 'Cloudflare');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

/**
 * 处理 GET 请求
 */
router.get('*', async (request, env, ctx) => {
  const url = new URL(request.url);
  const cacheKey = new Request(url, { method: 'GET' });

  // 尝试从缓存读取
  const cache = caches.default;
  let response = await cache.match(cacheKey);

  if (!response) {
    // 如果不在缓存中，获取资源
    response = await fetch(request);

    // 仅缓存成功的响应
    if (response.status === 200) {
      const cacheControl = getCacheControl(url);
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Cache-Control', cacheControl);

      // 在后台缓存响应
      ctx.waitUntil(cache.put(cacheKey, newResponse.clone()));
    }
  }

  return addSecurityHeaders(response);
});

/**
 * 处理 HEAD 请求
 */
router.head('*', async (request) => {
  const getRequest = new Request(request, { method: 'GET' });
  const response = await router.handle(getRequest);
  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
});

/**
 * 处理 OPTIONS 请求（CORS 预检）
 */
router.options('*', () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
});

/**
 * 404 处理
 */
router.all('*', () => {
  return new Response('404 Not Found', { status: 404 });
});

/**
 * 导出处理函数
 */
export default {
  async fetch(request, env, ctx) {
    return router.handle(request, env, ctx);
  }
};
