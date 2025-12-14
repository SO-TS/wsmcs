<script setup>
import { ref, computed } from 'vue'

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

const handleLoad = () => {
  isLoaded.value = true
  emit('load')
}

const handleError = () => {
  emit('error')
}
</script>

<template>
  <div class="image-container">
    <!-- Low-quality thumbnail - shown first -->
    <img
      v-if="thumbnail"
      :src="thumbnail"
      :alt="alt"
      class="image-thumbnail"
      :class="{ hidden: isLoaded }"
      aria-hidden="true"
    />
    <!-- High-quality image - loaded progressively -->
    <img
      :src="src"
      :alt="alt"
      class="image-main"
      :loading="loading"
      decoding="async"
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
