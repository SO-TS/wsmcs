<template>
  <!-- 多格式支持的图片组件 -->
  <!-- OptimizedImage.vue -->
  <!-- @description Progressive image loading component with blur-up effect -->
  <!-- Loads thumbnail first for fast initial paint, then loads full-quality image -->

  <!-- Picture element for multi-format support -->
  <picture v-if="srcSet" class="optimized-image__picture">
    <!-- AVIF 格式 - 最优压缩 (25-35% 更小) -->
    <source v-if="srcSet.avif" :srcset="srcSet.avif" type="image/avif">
    <!-- WebP 格式 - 良好压缩 (15-25% 更小) -->
    <source v-if="srcSet.webp" :srcset="srcSet.webp" type="image/webp">
    <!-- PNG/JPEG 降级方案 -->
    <img
      :src="srcSet.png || srcSet.webp || srcSet.avif"
      :alt="alt"
      :title="alt"
      :loading="loading"
      :decoding="decoding"
      :width="width"
      :height="height"
      class="optimized-image__img"
      v-bind="$attrs"
    >
  </picture>

  <!-- 简单图片（无多格式） -->
  <img
    v-else
    :src="src"
    :alt="alt"
    :title="alt"
    :loading="loading"
    :decoding="decoding"
    :width="width"
    :height="height"
    class="optimized-image__img"
    v-bind="$attrs"
  />
</template>

<script setup>
/**
 * @component OptimizedImage
 * @description 优化的响应式图片组件，支持多种格式和懒加载
 * 
 * @props {String} src - 简单图片源（当 srcSet 不提供时）
 * @props {Object} srcSet - 多格式图片对象 { avif, webp, png }
 * @props {String} alt - 图片替代文本（必需）
 * @props {String} loading - 加载策略 'lazy' | 'eager' (默认：'lazy')
 * @props {String} decoding - 解码方式 'async' | 'sync' (默认：'async')
 * @props {Number|String} width - 图片宽度
 * @props {Number|String} height - 图片高度
 * 
 * @example
 * <OptimizedImage
 *   :srcSet="{ avif: '/img.avif', webp: '/img.webp', png: '/img.png' }"
 *   alt="示例图片"
 *   loading="lazy"
 *   width="800"
 *   height="600"
 * />
 */
import { useImageOptimization, getThumbnailPath } from '@/composables/useImageOptimization'
import { computed } from 'vue'

const props = defineProps({
  // Original high-quality image source
  src: {
    type: String,
    required: true,
  },
  // Optional custom thumbnail source
  // If not provided, will auto-generate from src
  thumbnail: {
    type: String,
    default: null,
  },
  // Image alt text for accessibility
  alt: {
    type: String,
    required: true,
  },
  // CSS classes for the img element
  imgClass: {
    type: String,
    default: '',
  },
  // CSS classes for the wrapper div
  wrapperClass: {
    type: String,
    default: '',
  },
  // Enable lazy loading
  lazy: {
    type: Boolean,
    default: true,
  },
  // Image loading strategy: 'eager' or 'lazy'
  loading: {
    type: String,
    default: 'lazy',
    validator: (value) => ['eager', 'lazy'].includes(value),
  },
  // 图片解码方式
  // 'async' - 异步解码，不阻塞渲染（推荐）
  // 'sync' - 同步解码
  // 'auto' - 浏览器决定
  decoding: {
    type: String,
    default: 'async',
    validator: (value) => ['async', 'sync', 'auto'].includes(value),
  },
  // 图片宽度（用于防止布局抖动）
  width: {
    type: [Number, String],
    default: null,
  },
  // 图片高度（用于防止布局抖动）
  height: {
    type: [Number, String],
    default: null,
  },
  // 多格式图片对象
  // 预期格式：{ avif: 'url', webp: 'url', png: 'url' }
  srcSet: {
    type: Object,
    default: null,
    // 预期格式：{ avif: 'url', webp: 'url', png: 'url' }
  }
})

const emit = defineEmits(['load', 'error'])

// Determine thumbnail source
const thumbnailSrc = computed(() => {
  return props.thumbnail || getThumbnailPath(props.src)
})

// Use image optimization composable
const { isFullImageLoaded, currentSrc, imageOpacity, handleFullImageLoad, handleImageError } = 
  useImageOptimization(thumbnailSrc.value, props.src)

// Handle full image load
const onLoad = () => {
  handleFullImageLoad()  
  emit('load')
}

// Handle image error
const onError = () => {
  handleImageError()  
  emit('error')
}
</script>

<style scoped>
/* Base image styles */
.optimized-image__img {
  /* 响应式 */
  max-width: 100%;
  height: auto;
  /* 显示 */
  display: block;
  /* 平滑渲染 */
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  /* 防止闪烁 */
  transform: translateZ(0);
}

/* 高 DPI 屏幕支持 */
@media (min-device-pixel-ratio: 1.5) {
  .optimized-image__img {
    /* 可选：针对 Retina 屏幕的额外优化 */
    image-rendering: -webkit-optimize-contrast;
  }
}

/* 确保 picture 标签透明 */
.optimized-image__picture {
  display: contents;
}
</style>