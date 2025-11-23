<script setup>
/**
 * @file HeroSection.vue
 * @description Displays a prominent hero area with a background image, title, subtitle, and call-to-action buttons.
 */

import { useI18n } from 'vue-i18n';
import { IMAGES } from '../config/images';

const { t } = useI18n();

/**
 * Dynamically sets the background image for the hero section.
 * Uses a linear gradient overlay for better text readability.
 */
const heroBackgroundStyle = {
  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${IMAGES.heroBg})`,
};
</script>

<template>
  <!-- Hero Section container -->
  <section class="min-h-screen bg-cover bg-center flex items-center text-white relative" :style="heroBackgroundStyle">
    <!-- Main content wrapper -->
    <div class="max-w-7xl mx-auto px-6 w-full flex justify-start items-center -mt-20">
      <!-- Content block (text + buttons) -->
      <div class="max-w-xl fade-in-up">
        <!-- Hero Title -->
        <h1 class="text-6xl font-bold mb-4 tracking-wide">{{ t('hero.title') }}</h1> <!-- Changed to text-6xl -->
        <!-- Hero Subtitle -->
        <p class="text-2xl mb-8 opacity-90">{{ t('hero.subtitle') }}</p> <!-- Changed to text-2xl -->
        <!-- Call-to-action buttons, underneath text -->
        <div class="flex space-x-4">
          <a href="#" class="hero-btn-primary">{{ t('hero.joinGroup') }}</a>
          <a href="#" class="hero-btn-secondary">{{ t('hero.joinGame') }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-btn-primary {
  padding: 10px 24px; /* px-6 py-2.5 */
  border-radius: 6px; /* rounded-md */
  font-weight: 500; /* font-medium */
  font-size: 20px; /* Increased from 16px to 20px */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-block;

  background-color: var(--hero-btn-primary-bg);
  color: var(--hero-btn-primary-text);
  border: 1px solid var(--hero-btn-primary-border);
}
.hero-btn-primary:hover {
  background-color: var(--hero-btn-primary-bg-hover);
  border-color: var(--hero-btn-primary-border-hover);
}

.hero-btn-secondary {
  padding: 10px 24px; /* px-6 py-2.5 */
  border-radius: 6px; /* rounded-md */
  font-weight: 500; /* font-medium */
  font-size: 20px; /* Increased from 16px to 20px */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-block;

  background-color: var(--hero-btn-secondary-bg);
  color: var(--hero-btn-secondary-text);
  backdrop-filter: blur(5px); /* backdrop-blur-sm */
  border: 1px solid var(--hero-btn-secondary-border);
}
.hero-btn-secondary:hover {
  background-color: var(--hero-btn-secondary-bg-hover);
  border-color: var(--hero-btn-secondary-border-hover);
}

/* Page entry animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>
