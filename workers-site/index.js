/**
 * Cloudflare Worker for serving static assets
 * This file serves as the entry point for the Workers Site
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Remove leading slash for asset lookup
    let assetPath = pathname.substring(1);
    
    // Handle root path
    if (assetPath === '') {
      assetPath = 'index.html';
    }
    
    try {
      // Try to fetch the asset directly from the ASSETS namespace
      let response = await env.ASSETS.fetch(new URL(assetPath, request.url));
      
      // If the asset exists, return it with security headers
      if (response.status !== 404) {
        return addSecurityHeaders(response, getContentType(assetPath));
      }
    } catch (e) {
      // If there was an error fetching the specific asset, continue to SPA fallback
    }
    
    // If specific asset not found or is a route that doesn't exist, serve index.html for SPA
    try {
      const indexResponse = await env.ASSETS.fetch(new URL('index.html', request.url));
      return addSecurityHeaders(indexResponse, 'text/html');
    } catch (e) {
      // If even index.html is not found, return 404
      return new Response('Not Found', { status: 404 });
    }
  }
};

/**
 * Add security headers to the response
 */
function addSecurityHeaders(response, contentType) {
  const newHeaders = new Headers(response.headers);
  
  // Set content type if provided
  if (contentType) {
    newHeaders.set('Content-Type', contentType);
  }
  
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'SAMEORIGIN');
  newHeaders.set('X-XSS-Protection', '1; mode=block');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Server', 'Cloudflare');
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

/**
 * Get appropriate content type based on file extension
 */
function getContentType(path) {
  if (path.endsWith('.html')) return 'text/html';
  if (path.endsWith('.css')) return 'text/css';
  if (path.endsWith('.js')) return 'application/javascript';
  if (path.endsWith('.json')) return 'application/json';
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
  if (path.endsWith('.gif')) return 'image/gif';
  if (path.endsWith('.svg')) return 'image/svg+xml';
  if (path.endsWith('.ico')) return 'image/x-icon';
  if (path.endsWith('.woff')) return 'font/woff';
  if (path.endsWith('.woff2')) return 'font/woff2';
  if (path.endsWith('.ttf')) return 'font/ttf';
  if (path.endsWith('.eot')) return 'font/eot';
  return 'text/plain';
}