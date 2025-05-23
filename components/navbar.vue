<template>
  <div class="navbar" ref="navbarRef">
    <div class="desktop-nav">
      <NuxtLink :to="localePath('/cart')" class="cart-wrapper">
        <img :src="Cart" alt="cart" class="nav-cart-btn" />
        <div v-if="totalQuantity > 0" class="cart-count">{{ totalQuantity }}</div>
      </NuxtLink>

      <ul class="navbar-list">
        <li><NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink></li>
        <li><NuxtLink @click="toggleMenu" to="/#about-us">{{ $t('nav.about') }}</NuxtLink></li>
        <li><NuxtLink @click="toggleMenu" :to="localePath('/models')">{{ $t('nav.configurator') }}</NuxtLink></li>
      </ul>

      <NuxtLink :to="localePath('/')" class="logo">
        <img :src="Logo" alt="LiLogo" />
      </NuxtLink>

      <ul class="navbar-list">
        <li><NuxtLink @click="toggleMenu" :to="localePath('/market')">{{ $t('nav.shop') }}</NuxtLink></li>
        <li><NuxtLink @click="toggleMenu" :to="localePath('/carsinstock')">{{ $t('nav.in_stock') }}</NuxtLink></li>
        <li><NuxtLink @click="toggleMenu" :to="localePath('/models')">{{ $t('nav.models') }}</NuxtLink></li>
      </ul>

      <div class="nav-lang-dropdown">
        <div class="lang-btn" @click="toggleLangMenu">
          <img :src="Lang" alt="language" />
        </div>
        <transition name="fade">
          <ul v-if="isLangMenuVisible" class="lang-dropdown">
            <li @click="changeLang('uz')"><img src="@/assets/uz.png" alt="UZB" /></li>
            <li @click="changeLang('ru')"><img src="@/assets/ru.png" alt="RUS" /></li>
            <li @click="changeLang('en')"><img src="@/assets/en.png" alt="ENG" /></li>
          </ul>
        </transition>
      </div>
    </div>

    <div class="mobile-nav">
      <div class="mobile-header">
        <NuxtLink :to="localePath('/')" class="logo-center">
          <img :src="Logo" alt="LiLogo" />
        </NuxtLink>
        <div class="mobile-header-wrapper">
          <NuxtLink :to="localePath('/cart')" class="cart-wrapper">
            <img :src="Cart" alt="cart" class="nav-cart-btn" />
            <div v-if="totalQuantity > 0" class="cart-count">{{ totalQuantity }}</div>
          </NuxtLink>
          <div class="nav-lang-dropdown">
            <div class="lang-btn" @click="toggleLangMenu">
              <img :src="Lang" alt="language" />
            </div>
            <transition name="fade">
              <ul v-if="isLangMenuVisible" class="lang-dropdown">
                <li @click="changeLang('uz')"><img src="@/assets/uz.png" alt="UZB" /></li>
                <li @click="changeLang('ru')"><img src="@/assets/ru.png" alt="RUS" /></li>
                <li @click="changeLang('en')"><img src="@/assets/en.png" alt="ENG" /></li>
              </ul>
            </transition>
          </div>
          <button class="burger" @click="toggleMenu">
            <span :class="{ open: isOpen }"></span>
            <span :class="{ open: isOpen }"></span>
            <span :class="{ open: isOpen }"></span>
          </button>
        </div>
      </div>

      <transition name="fade">
        <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>
      </transition>

      <transition name="slide-fade">
        <ul v-if="isOpen" class="navbar-list-mobile fixed-menu">
          <li><NuxtLink @click="toggleMenu" :to="localePath('/models')">{{ $t('nav.models') }}</NuxtLink></li>
          <li><NuxtLink @click="toggleMenu" :to="localePath('/carsinstock')">{{ $t('nav.in_stock') }}</NuxtLink></li>
          <li><NuxtLink @click="toggleMenu" :to="localePath('/market')">{{ $t('nav.shop') }}</NuxtLink></li>
          <li><NuxtLink @click="toggleMenu" :to="localePath('/models')">{{ $t('nav.configurator') }}</NuxtLink></li>
          <li><NuxtLink @click="toggleMenu" to="/#about-us">{{ $t('nav.about') }}</NuxtLink></li>
          <li><NuxtLink @click="toggleMenu" :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink></li>
        </ul>
      </transition>

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import Logo from '@/assets/logo.png'
import Cart from '@/assets/cart.png'
import Lang from '@/assets/lang.png'

import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { useLocalePath } from '#imports'



const cart = useCartStore()
const totalQuantity = computed(() => cart.items.reduce((sum, item) => sum + item.quantity, 0))
const localePath = useLocalePath()
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const isLangMenuVisible = ref(false)
const isOpen = ref(false)
const navbarRef = ref<HTMLElement | null>(null)

const { setLocale, locale, t } = useI18n()
const router = useRouter()

const changeLang = async (lang: string) => {
  await setLocale(lang)              // изменяет locale и URL
  localStorage.setItem('lang', lang) // сохраняет язык
  isLangMenuVisible.value = false
}


const toggleLangMenu = () => {
  isLangMenuVisible.value = !isLangMenuVisible.value
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

watch(isOpen, (open) => {
  document.body.classList.toggle('menu-open', open)
})

onBeforeUnmount(() => {
  document.body.classList.remove('menu-open')
})

onMounted(async () => {
  router.afterEach(() => {
    isOpen.value = false
    document.body.classList.remove('menu-open')
  })

  const savedLang = localStorage.getItem('lang')
  if (savedLang && savedLang !== locale.value) {
    await setLocale(savedLang)
  }

  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleClickOutside(event: MouseEvent) {
  if (isLangMenuVisible.value && navbarRef.value && !navbarRef.value.contains(event.target as Node)) {
    isLangMenuVisible.value = false
  }
}

</script>
<style scoped>

.cart-wrapper {
  position: relative;
}
.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #000;
  color: white;
  font-size: 12px;
  border-radius: 999px;
  padding: 2px 6px;
}
.nav-lang-dropdown{
  position: relative;
}
.lang-dropdown {
  position: absolute;
  top: 19px;
  left: -10px;
  /* margin: 0; */
  background: white;
  border: 1px solid #ddd;
  overflow: hidden;
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
  border-radius: 36px;
  padding: 5px 0;
  z-index: 999;
}

.lang-dropdown li {
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}
.lang-dropdown li:hover {
  background: #f5f5f5;
}
.lang-dropdown li img {
  width: 30px;
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
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
  gap: 30px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.navbar-list li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
.logo img {
  width: 100px;
}
.nav-cart-btn,
.lang-btn {
  width: 26px;
  height: 26px;
  cursor: pointer;
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
.logo-center img {
  width: 60px;
}
.mobile-header-wrapper {
  display: flex;
  gap: 20px;
  align-items: center;
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .navbar{
    padding: 10px 0px;
  }
  .mobile-nav {
    display: flex;
  }
  .fixed-menu li {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #BFBFBF;
  }
}

:global(body.menu-open) {
  overflow: hidden;
}
</style>
