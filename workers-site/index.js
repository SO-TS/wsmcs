import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    const ASSET_MANIFEST = await import('./manifest.json', {
      assert: { type: 'json' }
    }).then(m => m.default);

    const customOptions = {
      ASSET_MANIFEST: ASSET_MANIFEST,
      cacheControl: {
        // 缓存时间配置
        browserTTL: 604800, // 7 days
        edgeTTL: 86400,     // 1 day
      },
    };

    try {
      // 尝试从 KV 获取资产
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        customOptions
      );
    } catch (e) {
      // 如果资产未找到，返回 index.html (用于 SPA 路由)
      const options = {
        ...customOptions,
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
      };

      try {
        return await getAssetFromKV(
          {
            request,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          options
        );
      } catch (e) {
        return new Response('Not Found', { status: 404 });
      }
    }
  },
};