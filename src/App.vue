<script setup>
/**
 * @file App.vue
 * @description Main application router view
 */

import { useI18n } from 'vue-i18n';

// 初始化国际化
const { locale } = useI18n();
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
}
</style>
