<template>
  <div class="min-h-screen flex flex-col">
    <!-- Page Header component -->
    <PageHeader />
    
    <!-- Main content area, with padding-top to offset the fixed header -->
    <main class="pt-20 flex-grow flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div class="text-center max-w-2xl px-4">
        <div class="error-code text-9xl font-bold text-gray-800 dark:text-gray-200 mb-4">403</div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {{ $t('error.forbiddenTitle') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('error.forbiddenMessage') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/zh/" 
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {{ $t('error.goHome') }}
          </a>
          <a 
            href="javascript:history.back()" 
            class="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {{ $t('error.goBack') }}
          </a>
        </div>
      </div>
    </main>
    
    <!-- Page Footer component -->
    <PageFooter />
  </div>
</template>

<script setup>
/**
 * @file ForbiddenError.vue
 * @description 403 Forbidden error page component with consistent UI
 */

import PageHeader from '../../layouts/PageHeader.vue';
import PageFooter from '../../layouts/PageFooter.vue';
</script>

<style scoped>
.error-code {
  font-family: 'Courier New', monospace;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}
</style>