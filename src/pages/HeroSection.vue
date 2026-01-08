<script setup>
/**
 * @file HeroSection.vue
 * @description Displays a prominent hero area with a background image, title, subtitle, and call-to-action buttons.
 */

import { useI18n } from 'vue-i18n';
import { IMAGES } from '../config/images';
import ProgressiveImage from '@/components/common/ProgressiveImage.vue';

const { t } = useI18n();

/**
 * Scrolls to the CTASection when the "Join Server" button is clicked.
 * Uses optimized smooth scrolling with passive listeners
 */
function scrollToCTASection() {
  const ctaSection = document.getElementById('cta-section');
  if (ctaSection) {
    // Use scrollIntoView with smooth behavior (GPU accelerated)
    ctaSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

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
  <section class="min-h-screen flex items-center text-white relative -mt-[70px] pt-[70px] overflow-hidden">
    <!-- Progressive background image -->
    <ProgressiveImage
      :src="IMAGES.heroBg"
      :thumbnail="IMAGES.heroBgThumbnail"
      alt="英雄背景"
      loading="eager"
      class="hero-bg-image"
    />
    
    <!-- Dark overlay for text readability -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
    
    <!-- Main content wrapper -->
    <div class="max-w-7xl mx-auto px-6 w-full flex justify-start items-center relative z-20">
      <!-- Content block (text + buttons) -->
      <div class="max-w-xl fade-in-up">
        <!-- Hero Title -->
        <h1 class="text-6xl font-bold mb-4 tracking-wide">{{ t('hero.title') }}</h1> <!-- Changed to text-6xl -->
        <!-- Hero Subtitle -->
        <p class="text-2xl mb-8 opacity-90 font-light leading-relaxed">
          <span class="block text-2xl mb-2">{{ t('hero.subtitle').split('\n')[0] }}</span>
          <span class="block ml-6 text-xl mb-2">{{ t('hero.subtitle').split('\n')[1] }}</span>
          <span class="block ml-6 text-xl">{{ t('hero.subtitle').split('\n')[2] }}</span>
        </p> <!-- Changed to text-2xl -->
        <!-- Call-to-action buttons, underneath text -->
        <div class="flex space-x-4">
          <a href="https://qm.qq.com/q/YIyqEGcMes" target="_blank" rel="noopener noreferrer" class="hero-btn-primary">{{ t('hero.joinGroup') }}</a>
          <button @click="scrollToCTASection" class="hero-btn-secondary">{{ t('hero.joinGame') }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Ensure the container for ProgressiveImage has proper dimensions */
:deep(.image-container) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

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
  border: none;

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
