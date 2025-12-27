<script setup lang="ts">
defineProps<{
  t: (key: string) => string
}>()
</script>

<template>
  <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
  >
    <div class="absolute top-20 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 z-40 p-6 md:hidden">
      <nav class="flex flex-col gap-4">
        <a v-for="key in ['home', 'docs', 'map']" :key="key" href="#" class="text-white/90 text-lg font-medium">{{ t(`nav.${key}`) }}</a>
      </nav>
    </div>
  </transition>
</template>
