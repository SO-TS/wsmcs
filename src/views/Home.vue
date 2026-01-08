<script setup>
/**
 * @file Home.vue
 * @description Home page component with all sections
 */

import { ref, onMounted, watch, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSEO } from '../composables/useSEO';

// Component Imports - PageHeader and HeroSection loaded immediately for better UX
import PageHeader from '../layouts/PageHeader.vue';
import HeroSection from '../pages/HeroSection.vue';

// Lazy load non-critical components
const FeaturesSection = defineAsyncComponent(() => import('../pages/FeaturesSection.vue'));
const TeamSection = defineAsyncComponent(() => import('../pages/TeamSection.vue'));
const CTASection = defineAsyncComponent(() => import('../pages/CTASection.vue'));
const PageFooter = defineAsyncComponent(() => import('../layouts/PageFooter.vue'));

const { locale } = useI18n();
const { setSEO } = useSEO();

/* Theme Management */
const theme = ref('light');

/**
 * Optimized theme switcher with lazy evaluation
 */
watch(theme, (newTheme) => {
  // Use classList for better performance than direct style manipulation
  const htmlEl = document.documentElement;
  if (newTheme === 'dark') {
    htmlEl.classList.add('dark');
    // Persist theme preference asynchronously
    requestIdleCallback?.(() => {
      localStorage.setItem('theme', 'dark');
    }, { timeout: 2000 }) || setTimeout(() => {
      localStorage.setItem('theme', 'dark');
    }, 0);
  } else {
    htmlEl.classList.remove('dark');
    requestIdleCallback?.(() => {
      localStorage.setItem('theme', 'light');
    }, { timeout: 2000 }) || setTimeout(() => {
      localStorage.setItem('theme', 'light');
    }, 0);
  }
}, { immediate: true });

onMounted(() => {
  // Set initial SEO tags using the new SEO composable
  setSEO(null, `Home${locale.value === 'en' ? 'En' : 'ZhCN'}`);
  
  // Load theme preference using non-blocking approach
  requestIdleCallback?.(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme.value = savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.value = 'dark';
    }
  }, { timeout: 3000 }) || (() => {
    // Fallback for browsers without requestIdleCallback
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme.value = savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.value = 'dark';
    }
  })();
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