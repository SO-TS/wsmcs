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
const isHovered = ref(false);
const isCopied = ref(false);
const showCheckmark = ref(false);

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
 * Shows the checkmark feedback immediately after copy.
 */
function showCopiedFeedback() {
  isCopied.value = true;
  showCheckmark.value = true;
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
      <div class="relative inline-block" @mouseenter="isHovered = true" @mouseleave="isHovered = false; showCheckmark = false; isCopied = false">
        <div
          v-edge-glow
          @click="copyToClipboard"
          class="cta-button px-16 py-2.5 rounded-lg text-xl font-bold inline-flex items-center cursor-pointer shadow-lg mb-4 select-all transition-all duration-300 ease-in-out v-edge-glow-container relative"
        >
          {{ t('cta.copy_ip') }}
          <!-- VuePress-style copy button -->
          <Transition name="copy-button">
            <button
              v-if="isHovered && !isCopied"
              class="copy-button"
              @click.stop="copyToClipboard"
              :title="t('cta.copy_ip')"
            >
              <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <!-- Checkmark icon shown after copy -->
            <button
              v-else-if="showCheckmark && isHovered"
              class="copy-button"
              disabled
            >
              <svg class="copy-icon checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </Transition>
        </div>
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

/* Copy button styling */
.copy-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
}

.copy-button:hover {
  opacity: 1;
}

.copy-icon {
  width: 18px;
  height: 18px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.checkmark-icon {
  color: #4ade80;
}

/* Copy button transition */
.copy-button-enter-active,
.copy-button-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.copy-button-enter-from {
  opacity: 0;
  transform: translateY(-50%) scale(0.8);
}

.copy-button-leave-to {
  opacity: 0;
  transform: translateY(-50%) scale(0.8);
}

</style>
