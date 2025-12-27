import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    try {
      const page = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.ASSETS,
          ASSET_MANIFEST: env.ASSET_MANIFEST,
        }
      );

      const response = new Response(page.body, page);

      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'SAMEORIGIN');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('Server', 'Cloudflare');

      return response;
    } catch (e) {
      // 如果资产未找到，返回 index.html (用于 SPA 路由)
      try {
        const fallbackRequest = new Request(`${new URL(request.url).origin}/index.html`, request);
        const page = await getAssetFromKV(
          {
            request: fallbackRequest,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.ASSETS,
            ASSET_MANIFEST: env.ASSET_MANIFEST,
          }
        );

        const response = new Response(page.body, page);
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Frame-Options', 'SAMEORIGIN');
        response.headers.set('X-XSS-Protection', '1; mode=block');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        response.headers.set('Server', 'Cloudflare');

        return response;
      } catch (e) {
        return new Response('Not Found', { status: 404 });
      }
    }
  },
};