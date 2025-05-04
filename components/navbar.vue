<template>
  <div class="navbar">
    <div class="desktop-nav">
      <ul class="navbar-list">
        <li><NuxtLink  @click="toggleMenu" to="/contact">Контакты</NuxtLink></li>
        <li><NuxtLink  @click="toggleMenu" to="#">О нас</NuxtLink></li>
        <li><NuxtLink  @click="toggleMenu" to="/configurator">Конфигуратор</NuxtLink></li>
      </ul>
      <NuxtLink to="/" class="logo">
        <img :src="Logo" alt="LiLogo" />
      </NuxtLink>
      <ul class="navbar-list">
        <li><NuxtLink  @click="toggleMenu" to="/market">Магазин</NuxtLink></li>
        <li><NuxtLink  @click="toggleMenu" to="#">Авто в наличии</NuxtLink></li>
        <li><NuxtLink  @click="toggleMenu" to="/models">Модели</NuxtLink></li>
      </ul>
    </div>

    <div class="mobile-nav">
      <div class="mobile-header">
        <NuxtLink to="/" class="logo-center">
          <img :src="Logo" alt="LiLogo" />
        </NuxtLink>
        <button class="burger" @click="toggleMenu">
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
        </button>
      </div>

      <!-- Overlay -->
      <transition name="fade">
        <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>
      </transition>

      <!-- Mobile Menu -->
      <transition name="slide-fade">
        <ul v-if="isOpen" class="navbar-list-mobile fixed-menu">
          <li><NuxtLink  @click="toggleMenu" to="/models">Модели</NuxtLink></li>
          <li><NuxtLink  @click="toggleMenu" to="#">Авто в наличии</NuxtLink></li>
          <li><NuxtLink  @click="toggleMenu" to="/market">Магазин</NuxtLink></li>
          <li><NuxtLink  @click="toggleMenu" to="/configurator">Конфигуратор</NuxtLink></li>
          <li><NuxtLink  @click="toggleMenu" to="#">О нас</NuxtLink></li>
          <li><NuxtLink  @click="toggleMenu" to="/contact">Контакты</NuxtLink></li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/assets/logo.png';

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (open) => {
  if (open) {
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
});

onBeforeUnmount(() => {
  document.body.classList.remove('menu-open');
});

const router = useRouter();
onMounted(() => {
  router.afterEach(() => {
    isOpen.value = false;
    document.body.classList.remove('menu-open');
  });
});
</script>


<style scoped>
/* Общие стили */
.navbar {
  width: 100%;
  padding: 10px 20px;
  z-index: 1002;
}

.desktop-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-list {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-list li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
.logo{
  text-decoration: none;
}
.logo img {
  width: 100px;
}

/* Mobile */
.mobile-nav {
  display: none;
  flex-direction: column;
  position: relative;
}

.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.logo-center{
  text-decoration: none;

}
.logo-center img {
  width: 60px;
}

.burger {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  z-index: 1003;
}

.burger span {
  display: block;
  width: 25px;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.burger span.open:nth-child(1) {
  transform: rotate(45deg) translateY(12px);
}
.burger span.open:nth-child(2) {
  opacity: 0;
}
.burger span.open:nth-child(3) {
  transform: rotate(-45deg) translateY(-10.5px);
}

.navbar-list-mobile {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fixed-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  padding-top: 60px;
  right: 0;
  z-index: 1001;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navbar-list-mobile li a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

/* Анимации */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Блокировка прокрутки */
:global(body.menu-open) {
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .mobile-nav {
    display: flex;
  }
  .fixed-menu li{
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #BFBFBF;
  }
}
</style>
