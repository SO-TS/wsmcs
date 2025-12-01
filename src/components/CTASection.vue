<script setup>
/**
 * @file CTASection.vue
 * @description Call-to-action section component, featuring a dynamic background, title, version tag,
 * and an interactive server address box with copy-to-clipboard functionality.
 */

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { IMAGES } from '../config/images';
import Toast from './Toast.vue';

const { t } = useI18n();
const toastNotification = ref(null);

/**
 * Dynamically sets the background image for the CTA section.
 * Uses a linear gradient overlay for better text readability.
 */
const ctaBackgroundStyle = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${IMAGES.ctaBg})`,
};

/**
 * Triggers a new toast notification.
 * @param {string} message - The message to display in the toast.
 */
function triggerToast(message) {
  toastNotification.value = {
    id: Date.now(), // Use timestamp as a unique ID
    message: message,
  };
}

/**
 * Copies the server IP address to the clipboard, with a fallback for insecure contexts.
 * Provides user feedback via a toast notification for success or failure.
 */
function copyToClipboard() {
  const textToCopy = t('cta.copy_ip');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      triggerToast(t('cta.copied_alert'));
    }).catch(err => {
      console.error('Failed to copy address using clipboard API: ', err);
      fallbackCopyToClipboard(textToCopy);
    });
  } else {
    fallbackCopyToClipboard(textToCopy);
  }
}

/**
 * Fallback method to copy text to the clipboard for environments where navigator.clipboard is not available.
 * @param {string} text - The text to be copied.
 */
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Make the textarea invisible
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      triggerToast(t('cta.copied_alert'));
    } else {
      triggerToast(t('cta.copy_failed_alert'));
    }
  } catch (err) {
    console.error('Fallback copy failed: ', err);
    triggerToast(t('cta.copy_failed_alert'));
  }

  document.body.removeChild(textArea);
}
</script>

<template>
  <!-- CTA Section container -->
  <section class="bg-cover bg-center text-center text-white py-16" :style="ctaBackgroundStyle">
    <div class="max-w-7xl mx-auto px-6">
      <!-- CTA Title -->
      <h2 class="text-4xl font-bold mb-3.5">{{ t('cta.title') }}</h2>
      <!-- Version Tag -->
      <span class="inline-block text-base opacity-80 mb-2">{{ t('cta.version') }}</span>
      <br>
      <!-- Interactive Server Address Box -->
      <div
        v-edge-glow
        @click="copyToClipboard"
        class="cta-button px-16 py-2.5 rounded-lg text-xl font-bold inline-flex items-center cursor-pointer shadow-lg mb-4 select-all transition-all duration-300 ease-in-out v-edge-glow-container"
      >
        {{ t('cta.copy_ip') }}
      </div>
      <!-- Footer Note -->
      <p class="text-xs opacity-50">{{ t('cta.note') }}</p>
    </div>
  </section>
  <Toast :notification="toastNotification" />
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
