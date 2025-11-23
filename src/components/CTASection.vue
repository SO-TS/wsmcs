<script setup>
/**
 * @file CTASection.vue
 * @description Call-to-action section component, featuring a dynamic background, title, version tag,
 * and an interactive server address box with copy-to-clipboard functionality.
 */

import { useI18n } from 'vue-i18n';
import { IMAGES } from '../config/images';

const { t } = useI18n();

/**
 * Dynamically sets the background image for the CTA section.
 * Uses a linear gradient overlay for better text readability.
 */
const ctaBackgroundStyle = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${IMAGES.ctaBg})`,
};

/**
 * Copies the server IP address to the clipboard.
 * Provides user feedback via alerts for success or failure.
 */
function copyToClipboard() {
  navigator.clipboard.writeText(t('cta.copy_ip')).then(() => {
    alert(t('cta.copied_alert'));
  }).catch(err => {
    console.error('Failed to copy address: ', err); // Changed error message to English for consistency
    alert(t('cta.copy_failed_alert'));
  });
}
</script>

<template>
  <!-- CTA Section container -->
  <section class="bg-cover bg-center text-center text-white py-24" :style="ctaBackgroundStyle">
    <div class="max-w-7xl mx-auto px-6">
      <!-- CTA Title -->
      <h2 class="text-4xl font-bold mb-2">{{ t('cta.title') }}</h2>
      <!-- Version Tag -->
      <span class="inline-block text-base opacity-80 mb-8">{{ t('cta.version') }}</span>
      <br>
      <!-- Interactive Server Address Box -->
      <div
        v-edge-glow
        @click="copyToClipboard"
        class="cta-button px-16 py-3 rounded-lg text-xl font-bold inline-flex items-center cursor-pointer shadow-lg mb-4 select-all transition-all duration-300 ease-in-out v-edge-glow-container"
      >
        {{ t('cta.copy_ip') }}
      </div>
      <!-- Footer Note -->
      <p class="text-xs opacity-50">{{ t('cta.note') }}</p>
    </div>
  </section>
</template>

<style scoped>
.cta-button {
  background-color: var(--cta-btn-bg);
  color: var(--cta-btn-text);
  box-shadow: 0 4px 15px var(--cta-btn-shadow);
  opacity: 0.7; /* Added for semi-transparency */
}
.cta-button:hover {
  box-shadow: 0 4px 20px var(--cta-btn-shadow-hover);
  opacity: 1; /* Make it fully opaque on hover for better interaction feedback */
}
</style>