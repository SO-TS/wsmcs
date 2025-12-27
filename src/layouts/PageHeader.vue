<script setup>
/**
 * @file PageHeader.vue
 * @description Global header that shrinks to a minimal mode on scroll.
 * Optimized with throttled scroll handling for better performance
 */

import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import logoUrl from '@/assets/wsmcs-logo.png'
import { useRouter, useRoute } from 'vue-router';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();

const isShrunk = ref(false);
const scrollThreshold = 70;
let ticking = false;
let lastScrollY = 0;

// 切換語言
function switchLanguage(lang) {
  console.log('Switching language to:', lang); // 调试信息
  // 更新国际化语言
  locale.value = lang;
  // 保存語言選擇到本地存儲
  localStorage.setItem('locale', lang);
  
  // 修改當前路由以包含語言前綴
  const currentPath = route.path;
  console.log('Current path:', currentPath); // 调试信息
  
  // 如果當前路徑是以語言代碼開頭的，則替換語言代碼；否則添加語言代碼
  let newPath;
  if (/^\/(zh|en)\//.test(currentPath)) {
    // 如果當前路徑已經包含語言前綴，替換它
    newPath = currentPath.replace(/^\/(zh|en)\//, `/${lang}/`);
  } else if (/^\/(zh|en)$/.test(currentPath)) {
    // 如果當前路徑就是語言前綴
    newPath = `/${lang}/`;
  } else {
    // 如果當前路徑不包含語言前綴，添加它
    newPath = `/${lang}${currentPath === '/' ? '' : currentPath}`;
  }
  
  console.log('New path:', newPath); // 调试信息
  
  // 路由跳转
  router.push(newPath).then(() => {
    console.log('Navigation successful'); // 调试信息
    // 强制更新国际化实例
    i18n.global.locale = lang;
  }).catch(err => {
    console.error('Navigation error:', err); // 错误信息
    // 如果路由跳转失败，至少更新语言
    i18n.global.locale = lang;
  });
}

// Throttled scroll handler for better performance
function handleScroll() {
  lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  
  if (!ticking) {
    requestAnimationFrame(() => {
      isShrunk.value = lastScrollY > scrollThreshold;
      ticking = false;
    });
    ticking = true;
  }
}

onMounted(() => {
  // Use passive listener for better scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});</script>

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
        <img :src="logoUrl" alt="WSMCS Logo" class="w-8 h-8 mr-2.5 flex-shrink-0 object-contain aspect-square block" />
      </a>
      
      <!-- New Navigation Links (Right) -->
      <nav class="flex items-center space-x-8">
        <a href="#" class="nav-link nav-link-active">{{ t('nav.home') }}</a>
        <a href="#" class="nav-link">{{ t('nav.docs') }}</a>
        <a href="#" class="nav-link">{{ t('nav.map') }}</a>
        <!-- Language Switcher -->
        <div class="language-switcher relative group">
          <button class="lang-btn flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200" 
                  aria-label="切换语言">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4" viewBox="0 0 24 24">
              <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
            </svg>
          </button>
          <div class="lang-dropdown absolute right-0 mt-1.5 min-w-[120px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform translate-y-1 group-hover:translate-y-0">
            <button @click="switchLanguage('zh')" class="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-150 ease-in-out relative z-10">
              <span class="inline-flex items-center justify-center w-5 h-5 text-base leading-4 align-middle">🇨🇳</span>
              <span class="leading-5">{{ t('nav.language_zh') || '中文' }}</span>
            </button>
            <button @click="switchLanguage('en')" class="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-150 ease-in-out relative z-10">
              <span class="inline-flex items-center justify-center w-5 h-5 text-base leading-4 align-middle">🇺🇸</span>
              <span class="leading-5">{{ t('nav.language_en') || 'English' }}</span>
            </button>
          </div>
        </div>
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
  overflow: visible;
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

/* Language Switcher Styles */
.lang-btn {
  color: var(--header-text);
}

.lang-btn:hover {
  color: var(--header-text-hover);
}

.language-switcher {
  position: relative;
}

.lang-dropdown {
  min-width: 100%;
}

/* 为语言选项添加平滑悬停过渡效果 */
button {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

button:hover {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
