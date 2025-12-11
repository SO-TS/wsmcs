<script setup>
/**
 * @file CTASection.vue
 * @description Call-to-action section component, featuring a dynamic background, title, version tag,
 * and an interactive server address box with copy-to-clipboard functionality.
 */

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { IMAGES } from '../config/images';

const { t } = useI18n();
const isCopied = ref(false);
let copyTimeoutId = null;

/**
 * Dynamically sets the background image for the CTA section.
 * Uses a linear gradient overlay for better text readability.
 */
const ctaBackgroundStyle = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${IMAGES.ctaBg})`,
};

/**
 * Copies the server IP address to the clipboard, with a fallback for insecure contexts.
 * Shows a brief "Copied" feedback similar to VuePress code blocks.
 */
function copyToClipboard() {
  const textToCopy = t('cta.copy_ip');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showCopiedFeedback();
    }).catch(err => {
      console.error('Failed to copy address using clipboard API: ', err);
      fallbackCopyToClipboard(textToCopy);
    });
  } else {
    fallbackCopyToClipboard(textToCopy);
  }
}

/**
 * Shows the "Copied" feedback for a brief moment, similar to VuePress.
 */
function showCopiedFeedback() {
  isCopied.value = true;
  
  // Clear any existing timeout
  if (copyTimeoutId) {
    clearTimeout(copyTimeoutId);
  }
  
  // Reset after 2 seconds
  copyTimeoutId = setTimeout(() => {
    isCopied.value = false;
  }, 2000);
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
      showCopiedFeedback();
    }
  } catch (err) {
    console.error('Fallback copy failed: ', err);
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
      <div class="relative inline-block">
        <div
          v-edge-glow
          @click="copyToClipboard"
          class="cta-button px-16 py-2.5 rounded-lg text-xl font-bold inline-flex items-center cursor-pointer shadow-lg mb-4 select-all transition-all duration-300 ease-in-out v-edge-glow-container"
        >
          {{ t('cta.copy_ip') }}
        </div>
        <!-- VuePress-style copy feedback -->
        <Transition name="copy-feedback">
          <div v-if="isCopied" class="copy-feedback">
            {{ t('cta.copied_alert') }}
          </div>
        </Transition>
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

/* VuePress-style copy feedback */
.copy-feedback {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap;
}

/* Transition for copy feedback */
.copy-feedback-enter-active,
.copy-feedback-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.copy-feedback-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.copy-feedback-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>
