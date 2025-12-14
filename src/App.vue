<script setup>
/**
 * @file App.vue
 * @description Main application component, responsible for global layout, theme management, and language switching.
 * Optimized with lazy loading for better performance.
 */

import { ref, onMounted, watch, defineAsyncComponent } from 'vue'; // Added defineAsyncComponent
import { useI18n } from 'vue-i18n';

// Component Imports - PageHeader and HeroSection loaded immediately for better UX
import PageHeader from './components/PageHeader.vue';
import HeroSection from './components/HeroSection.vue';

// Lazy load non-critical components
const FeaturesSection = defineAsyncComponent(() => import('./components/FeaturesSection.vue'));
const TeamSection = defineAsyncComponent(() => import('./components/TeamSection.vue'));
const CTASection = defineAsyncComponent(() => import('./components/CTASection.vue'));
const PageFooter = defineAsyncComponent(() => import('./components/PageFooter.vue'));

const { locale } = useI18n();

/* Theme Management */
const theme = ref('light'); // Reactive state for the current theme ('light' or 'dark')

/**
 * Watches for changes in the 'theme' ref and applies/removes the 'dark' class
 * to the document's root element (<html>).
 * Runs immediately on component setup to apply the initial theme.
 */
watch(theme, (newTheme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, { immediate: true });

onMounted(() => {
  // Attempt to load theme preference from local storage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.value = savedTheme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If no saved theme, detect user's system preference
    theme.value = 'dark';
  }
});

// Language switching logic is not directly managed in the header anymore,
// but the `locale` ref from useI18n is still available if needed elsewhere.
</script>

<template>
  <!-- Main application container -->
  <div class="min-h-screen">
    <!-- Page Header component -->
    <PageHeader />
    <!-- Main content area, with padding-top to offset the fixed header -->
    <main class="pt-20">
      <!-- Hero Section -->
      <HeroSection />
      <!-- Features Section -->
      <FeaturesSection />
      <!-- Team Section with interactive glow effect -->
      <TeamSection />
      <!-- Call to Action Section -->
      <CTASection />
    </main>
    <!-- Page Footer component -->
    <PageFooter />
  </div>
</template>
