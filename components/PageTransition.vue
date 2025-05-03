<template>
  <transition name="page-slide" mode="out-in" @before-enter="beforeEnter" @after-enter="afterEnter">
    <slot />
  </transition>

  <div v-if="loading" class="transition-overlay">
    <img :src="Logo" class="transition-logo" alt="LiXiang" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Logo from '@/assets/logo.png';

const loading = ref(false);

const beforeEnter = () => {
  loading.value = true;
};

const afterEnter = () => {
  setTimeout(() => {
    loading.value = false;
  }, 400); // время совпадает с анимацией
};
</script>

<style scoped>
.transition-overlay {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: overlayFadeOut 0.4s ease 0.4s forwards;
}

.transition-logo {
  width: 100px;
  height: auto;
  animation: logoFlyIn 0.4s ease forwards;
}

@keyframes logoFlyIn {
  0% {
    transform: scale(0.5) rotate(-15deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(10deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@keyframes overlayFadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
