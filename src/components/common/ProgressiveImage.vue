<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: String,
  thumbnail: String,
  alt: {
    type: String,
    default: 'Image',
  },
  loading: {
    type: String,
    default: 'lazy',
  },
})

const emit = defineEmits(['load', 'error'])

const isLoaded = ref(false)
let imageController = null

const handleLoad = () => {
  isLoaded.value = true
  emit('load')
}

const handleError = () => {
  emit('error')
}

// Cleanup on unmount
onBeforeUnmount(() => {
  if (imageController) {
    imageController.abort()
  }
})
</script>

<template>
  <div class="image-container">
    <!-- Low-quality thumbnail - shown first for LCP optimization -->
    <img
      v-if="thumbnail"
      :src="thumbnail"
      :alt="alt"
      class="image-thumbnail"
      :class="{ hidden: isLoaded }"
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
    <!-- High-quality image - loaded progressively with optimization -->
    <img
      :src="src"
      :alt="alt"
      class="image-main"
      :loading="loading"
      decoding="async"
      importance="high"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.image-thumbnail,
.image-main {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.image-thumbnail {
  filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease-out;
}

.image-thumbnail.hidden {
  opacity: 0;
  pointer-events: none;
}

.image-main {
  transition: opacity 0.3s ease-in;
  position: relative;
  z-index: 1;
}
</style>
