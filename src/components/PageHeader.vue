<script setup>
/**
 * @file PageHeader.vue
 * @description Global header that shrinks to a minimal mode on scroll.
 */

import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Logo from './Logo.vue';

const { t } = useI18n();

const isShrunk = ref(false);
const scrollThreshold = 70; // The point at which the header shrinks

function handleScroll() {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  isShrunk.value = currentScrollPosition > scrollThreshold;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 header-bg-color transition-all duration-300 ease-in-out"
    :class="{ 'header--shrunk': isShrunk }"
  >
    <div class="max-w-screen-2xl mx-auto px-12 flex justify-between items-center h-full">
      <!-- Logo and Brand Name (Left) -->
      <a 
        href="#" 
        class="logo-container flex items-center font-bold text-xl header-logo-color transition-all duration-300 ease-in-out"
        :class="{ 'logo--hidden': isShrunk }"
      >
        <Logo class="h-8 mr-2.5 flex-shrink-0" />
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
header {
  height: 70px;
  /* Apply the non-translucent background by default */
  background-color: var(--header-bg);
}

.header--shrunk {
  height: 48px;
  /* Add backdrop filter for blur effect */
  backdrop-filter: blur(100px);
  /* Switch to the translucent background when shrunk */
  background-color: var(--header-bg-translucent); 
}

.logo-container {
  /* Base state styles */
  width: auto;
  opacity: 1;
  transform: scale(1);
  overflow: hidden;
}

.logo--hidden {
  /* Hidden state styles */
  width: 0;
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

/* This class is no longer needed on the header element itself, 
   as the background is now handled by the default and shrunk states. */
.header-bg-color {
  /* background-color: var(--header-bg); */
}

.header-logo-color {
  color: var(--header-logo-color);
}

.nav-link {
  color: var(--header-text);
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
}
.nav-link:hover {
  color: var(--header-text-hover);
}

.nav-link-active {
  color: var(--primary-blue-badge);
  font-weight: 700;
}
</style>
