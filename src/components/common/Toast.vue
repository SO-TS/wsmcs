<template>
  <Transition name="toast">
    <div v-if="visible" class="toast" :style="{ '--toast-duration': `${duration}ms` }">
      <div class="toast-message">{{ message }}</div>
      <div class="toast-progress"></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  notification: Object,
  duration: {
    type: Number,
    default: 3000
  }
});

const visible = ref(false);
const message = ref('');
let timer = null;

watch(() => props.notification, (newNotification) => {
  if (newNotification) {
    message.value = newNotification.message;
    
    if (visible.value) {
      visible.value = false;
      clearTimeout(timer);
      import('vue').then(({ nextTick }) => {
        nextTick(() => {
          showToast();
        });
      });
    } else {
      showToast();
    }
  }
}, { deep: true });

function showToast() {
  visible.value = true;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
</script>

<style scoped>
@keyframes progress {
  from { width: 100%; }
  to { width: 0; }
}

.toast {
  position: fixed;
  bottom: 40px; /* Increased from 20px */
  left: 50%;
  transform: translateX(-50%);
  
  min-width: 320px; /* Set a minimum width */
  text-align: center; /* Center the text inside */
  
  background-color: #333;
  color: white;
  border-radius: 12px;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  overflow: hidden;
  padding: 14px 28px;
}

.toast-message {
  margin-bottom: 10px;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(rgba(255, 255, 255, 0.38));
  animation: progress linear forwards;
  animation-duration: var(--toast-duration);
}

/* --- Enter Animation --- */
.toast-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, 30px) scale(0.95);
}
.toast-enter-to {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

/* --- Leave Animation --- */
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.6, 0, 0.8, 0);
}
.toast-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
