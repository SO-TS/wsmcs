/**
 * @file v-scroll-fade.js
 * @description High-performance scroll fade-in directive using IntersectionObserver
 * Optimized with passive event handling and memory management
 */

// Shared IntersectionObserver instance for all elements (performance optimization)
let sharedObserver = null;

function getSharedObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        
        if (entry.isIntersecting && !el._scrollAnimated) {
          // Use requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
            el.style.opacity = el._originalOpacity || '1';
            el._scrollAnimated = true;
            
            // Remove transition after animation completes to avoid interfering with other interactions
            setTimeout(() => {
              el.style.transition = '';
              el.style.transitionDelay = '';
            }, 600); // Match the CSS transition duration (0.6s)
            
            // Unobserve after animation starts
            sharedObserver.unobserve(el);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
  }
  return sharedObserver;
}

export default {
  mounted(el, binding) {
    // Check if element is initially visible
    const computedStyle = window.getComputedStyle(el);
    const originalOpacity = computedStyle.opacity;
    
    // Skip animation for already hidden elements
    if (originalOpacity === '0' || computedStyle.visibility === 'hidden') {
      el._scrollAnimated = true;
      return;
    }
    
    // Store original opacity for later restoration
    el._originalOpacity = originalOpacity !== '1' ? originalOpacity : '1';
    el._scrollAnimated = false;
    
    // Use CSS transition for better performance
    // Avoid reflow by batching style changes
    el.style.cssText += `;opacity:0;transition:opacity 0.6s ease-out`;
    
    // Get animation delay from binding value
    const delay = binding.value?.delay || 0;
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
    
    // Use shared observer instance
    const observer = getSharedObserver();
    observer.observe(el);
    el._scrollObserver = observer;
  },
  
  unmounted(el) {
    // Clean up observer reference when element is removed
    if (el._scrollObserver) {
      el._scrollObserver.unobserve(el);
    }
    
    // Reset custom properties
    el._scrollAnimated = null;
    el._originalOpacity = null;
  }
};

