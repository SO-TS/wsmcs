<script setup>
/**
 * @file PageHeader.vue
 * @description Global header component with navigation. Theme and language are now automatically detected.
 */

import { useI18n } from 'vue-i18n';
import Logo from './Logo.vue';

const { t } = useI18n();

// Removed emit and props related to theme/language toggles as they are no longer needed.
</script>

<template>
  <!-- Page Header container -->
  <header class="fixed top-0 left-0 w-full z-50 py-5 header-bg-color">
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <!-- Logo and Brand Name (Left) -->
      <a href="#" class="flex items-center font-bold text-xl header-logo-color">
        <Logo class="h-8 mr-2.5" />
      </a>
      
      <!-- New Navigation Links (Right) -->
      <nav class="flex items-center space-x-8">
        <a href="#" class="nav-link nav-link-active">{{ t('nav.home') }}</a>
        <a href="#" class="nav-link">{{ t('nav.docs') }}</a>
        <a href="#" class="nav-link">{{ t('nav.map') }}</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-bg-color {
  background-color: var(--header-bg);
}

.header-logo-color {
  color: var(--header-logo-color); /* Apply theme-aware color to logo text and SVG stroke */
}

.nav-link {
  color: var(--header-text);
  font-size: 15px; /* text-base */
  font-weight: 500; /* font-medium */
  transition: color 0.2s ease-in-out;
}
.nav-link:hover {
  color: var(--header-text-hover);
}

.nav-link-active {
  color: var(--primary-blue-badge); /* Using theme-aware CSS variable */
  font-weight: 700; /* Make it bold to indicate selection */
}
</style>
