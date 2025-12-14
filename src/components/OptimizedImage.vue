/**<template>

 * @file OptimizedImage.vue  <!-- 多格式支持的图片组件 -->

 * @description Progressive image loading component with blur-up effect  <picture v-if="srcSet" class="optimized-image">

 * Loads thumbnail first for fast initial paint, then loads full-quality image    <!-- AVIF 格式 - 最优压缩 (25-35% 更小) -->

 */    <source v-if="srcSet.avif" :srcset="srcSet.avif" type="image/avif">

    <!-- WebP 格式 - 良好压缩 (15-25% 更小) -->

<script setup>    <source v-if="srcSet.webp" :srcset="srcSet.webp" type="image/webp">

import { useImageOptimization, getThumbnailPath } from '@/composables/useImageOptimization'    <!-- PNG/JPEG 降级方案 -->

import { computed } from 'vue'    <img

      :src="srcSet.png || srcSet.webp || srcSet.avif"

const props = defineProps({      :alt="alt"

  // Original high-quality image source      :title="alt"

  src: {      :loading="loading"

    type: String,      :decoding="decoding"

    required: true,      :width="width"

  },      :height="height"

  // Optional custom thumbnail source      class="optimized-image__img"

  // If not provided, will auto-generate from src      v-bind="$attrs"

  thumbnail: {    >

    type: String,  </picture>

    default: null,  <!-- 简单图片（无多格式） -->

  },  <img

  // Image alt text for accessibility    v-else

  alt: {    :src="src"

    type: String,    :alt="alt"

    default: 'Image',    :title="alt"

  },    :loading="loading"

  // CSS classes for the img element    :decoding="decoding"

  imgClass: {    :width="width"

    type: String,    :height="height"

    default: '',    v-bind="$attrs"

  },  >

  // CSS classes for the wrapper div</template>

  wrapperClass: {

    type: String,<script setup>

    default: '',/**

  }, * @component OptimizedImage

  // Enable lazy loading * @description 优化的响应式图片组件，支持多种格式和懒加载

  lazy: { * 

    type: Boolean, * @props {String} src - 简单图片源（当 srcSet 不提供时）

    default: true, * @props {Object} srcSet - 多格式图片对象 { avif, webp, png }

  }, * @props {String} alt - 图片替代文本（必需）

  // Image loading strategy: 'eager' or 'lazy' * @props {String} loading - 加载策略 'lazy' | 'eager' (默认：'lazy')

  loading: { * @props {String} decoding - 解码方式 'async' | 'sync' (默认：'async')

    type: String, * @props {Number|String} width - 图片宽度

    default: 'lazy', * @props {Number|String} height - 图片高度

    validator: (value) => ['eager', 'lazy'].includes(value), * 

  }, * @example

}) * <OptimizedImage

 *   :srcSet="{ avif: '/img.avif', webp: '/img.webp', png: '/img.png' }"

const emit = defineEmits(['load', 'error']) *   alt="示例图片"

 *   loading="lazy"

// Determine thumbnail source *   width="800"

const thumbnailSrc = computed(() => { *   height="600"

  return props.thumbnail || getThumbnailPath(props.src) * />

}) */



// Use image optimization composabledefineProps({

const { isFullImageLoaded, currentSrc, imageOpacity, handleFullImageLoad, handleImageError } =  // 简单图片源

  useImageOptimization(thumbnailSrc.value, props.src)  src: {

    type: String,

// Handle full image load    default: null,

const onLoad = () => {  },

  handleFullImageLoad()  

  emit('load')  // 多格式图片对象

}  srcSet: {

    type: Object,

// Handle image error    default: null,

const onError = () => {    // 预期格式：{ avif: 'url', webp: 'url', png: 'url' }

  handleImageError()  },

  emit('error')  

}  // 替代文本（SEO 和可访问性）

</script>  alt: {

    type: String,

<template>    required: true,

  <div class="optimized-image-wrapper" :class="wrapperClass">  },

    <!-- Thumbnail image - loaded first for fast visual feedback -->  

    <img  // 图片加载策略

      :src="thumbnailSrc"  // 'lazy' - 懒加载（非首屏图片推荐）

      :alt="alt"  // 'eager' - 立即加载（首屏图片推荐）

      class="optimized-image optimized-image--thumbnail"  loading: {

      :class="[imgClass, { 'is-hidden': isFullImageLoaded }]"    type: String,

      aria-hidden="true"    default: 'lazy',

    />    validator: (value) => ['lazy', 'eager'].includes(value),

  },

    <!-- Full-quality image - loaded asynchronously -->  

    <img  // 图片解码方式

      :src="props.src"  // 'async' - 异步解码，不阻塞渲染（推荐）

      :alt="alt"  // 'sync' - 同步解码

      class="optimized-image optimized-image--full"  // 'auto' - 浏览器决定

      :class="imgClass"  decoding: {

      :loading="props.loading"    type: String,

      @load="onLoad"    default: 'async',

      @error="onError"    validator: (value) => ['async', 'sync', 'auto'].includes(value),

      :style="{ opacity: imageOpacity }"  },

    />  

  // 图片宽度（用于防止布局抖动）

    <!-- Loading indicator - shown while full image is loading -->  width: {

    <div v-if="!isFullImageLoaded" class="image-loading-indicator" aria-label="Loading image">    type: [Number, String],

      <div class="spinner"></div>    default: null,

    </div>  },

  </div>  

</template>  // 图片高度（用于防止布局抖动）

  height: {

<style scoped>    type: [Number, String],

/* Wrapper container with relative positioning for layering */    default: null,

.optimized-image-wrapper {  },

  position: relative;});

  overflow: hidden;</script>

  background: linear-gradient(135deg, #f0f0f0 25%, #f8f8f8 25%, #f8f8f8 50%, #f0f0f0 50%, #f0f0f0 75%, #f8f8f8 75%, #f8f8f8);

  background-size: 20px 20px;<style scoped>

}/* 确保 picture 标签透明 */

.optimized-image {

/* Base image styles */  display: contents;

.optimized-image {}

  display: block;

  width: 100%;/* 图片样式 */

  height: auto;.optimized-image__img {

  transition: opacity 0.3s ease-in-out;  /* 响应式 */

}  max-width: 100%;

  height: auto;

/* Thumbnail image - blurred and lower quality */  

.optimized-image--thumbnail {  /* 显示 */

  filter: blur(8px);  display: block;

  position: absolute;  

  top: 0;  /* 平滑渲染 */

  left: 0;  backface-visibility: hidden;

}  -webkit-font-smoothing: antialiased;

  

/* Hide thumbnail when full image is loaded */  /* 防止闪烁 */

.optimized-image--thumbnail.is-hidden {  transform: translateZ(0);

  opacity: 0;}

  pointer-events: none;

}/* 高 DPI 屏幕支持 */

@media (min-device-pixel-ratio: 1.5) {

/* Full-quality image */  .optimized-image__img {

.optimized-image--full {    /* 可选：针对 Retina 屏幕的额外优化 */

  position: relative;    image-rendering: -webkit-optimize-contrast;

  z-index: 1;  }

}}

</style>

/* Loading indicator */
.image-loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

/* Spinner animation */
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Dark mode styles */
.dark .optimized-image-wrapper {
  background: linear-gradient(135deg, #2a2a2a 25%, #333 25%, #333 50%, #2a2a2a 50%, #2a2a2a 75%, #333 75%, #333);
}

.dark .spinner {
  border-color: rgba(255, 255, 255, 0.1);
  border-top-color: rgba(255, 255, 255, 0.3);
}
</style>
