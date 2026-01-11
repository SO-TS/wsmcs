<script setup>
/**
 * @file UnauthorizedError.vue
 * @description 401 Unauthorized error page component with consistent UI
 */

import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSEO } from '../../composables/useSEO';

const { t } = useI18n();
const { setSEO } = useSEO();

// 当组件挂载时设置SEO标签
onMounted(() => {
  // 根据当前语言环境设置适当的SEO标签
  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes('/en/');
  setSEO(null, isEnglish ? 'UnauthorizedErrorEn' : 'UnauthorizedErrorZhCN');
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error icon or illustration -->
      <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-orange-100 dark:bg-orange-900/30">
        <span class="text-5xl font-bold text-orange-500 dark:text-orange-400">401</span>
      </div>
      
      <!-- Error title -->
      <h1 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
        {{ t('error.unauthorizedTitle') }}
      </h1>
      
      <!-- Error message -->
      <p class="mt-4 text-base text-gray-600 dark:text-gray-300">
        {{ t('error.unauthorizedMessage') }}
      </p>
      
      <!-- Action buttons -->
      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <!-- Return home button -->
        <router-link 
          :to="`/${$i18n.locale}/`" 
          class="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          {{ t('error.goHome') }}
        </router-link>
        
        <!-- Go to login button -->
        <router-link 
          :to="`/${$i18n.locale}/`" 
          class="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          {{ t('error.contactSupport') }}
        </router-link>
      </div>
    </div>
  </div>
</template>