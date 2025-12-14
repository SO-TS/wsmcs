/**
 * @file useImageOptimization.js
 * @description Composable for optimized image loading with progressive enhancement
 * Loads low-quality placeholder first, then high-quality image
 */

import { ref, computed } from 'vue'

/**
 * Progressive image loading composable
 * @param {string} thumbnailSrc - Low-quality/compressed image URL
 * @param {string} fullSrc - High-quality/original image URL
 * @returns {Object} Image loading state and methods
 */
export function useImageOptimization(thumbnailSrc, fullSrc) {
  const isFullImageLoaded = ref(false)
  const hasError = ref(false)
  const isLoading = ref(true)

  /**
   * Handle full image load completion
   */
  const handleFullImageLoad = () => {
    isFullImageLoaded.value = true
    isLoading.value = false
  }

  /**
   * Handle image loading errors
   */
  const handleImageError = () => {
    hasError.value = true
    isLoading.value = false
  }

  /**
   * Determine which image source to display
   */
  const currentSrc = computed(() => {
    if (hasError.value) return thumbnailSrc // Fallback to thumbnail on error
    return isFullImageLoaded.value ? fullSrc : thumbnailSrc
  })

  /**
   * Determine opacity based on image load state
   */
  const imageOpacity = computed(() => {
    return isFullImageLoaded.value ? 1 : 0.7
  })

  return {
    isFullImageLoaded,
    hasError,
    isLoading,
    currentSrc,
    imageOpacity,
    handleFullImageLoad,
    handleImageError,
  }
}

/**
 * Utility function to preload an image
 * @param {string} src - Image URL to preload
 * @returns {Promise} Resolves when image is loaded
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

/**
 * Generate thumbnail URL for local images
 * Appends -thumb suffix before file extension
 * @param {string} imagePath - Original image path
 * @returns {string} Thumbnail image path
 */
export function getThumbnailPath(imagePath) {
  if (!imagePath || imagePath.startsWith('http')) {
    return imagePath // Return as-is for external URLs (already optimized)
  }
  const lastDotIndex = imagePath.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return imagePath + '-thumb'
  }
  return (
    imagePath.slice(0, lastDotIndex) +
    '-thumb' +
    imagePath.slice(lastDotIndex)
  )
}
