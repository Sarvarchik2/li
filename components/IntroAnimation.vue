<template>
  <div class="intro" v-if="show">
    <img class="logo" :src="Logo" alt="LiXiang" />
    <p class="tagline">Yas Auto</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Logo from '@/assets/logo.png';

const show = ref(true);

onMounted(() => {
  document.body.classList.add('intro-active');

  setTimeout(() => {
    show.value = false;
    document.body.classList.remove('intro-active');
  }, 3000);
});

</script>

<style scoped>
body.intro-active {
  overflow: hidden;
}

.intro {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeOut 0.6s ease-out 2.5s forwards;
}

.logo {
  width: 120px;
  height: auto;
  animation: scaleIn 0.6s ease-out;
}

.tagline {
  color:#000;
  font-size: 20px;
  margin-top: 20px;
  opacity: 0;
  animation: fadeIn 1.2s ease-out 0.8s forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
