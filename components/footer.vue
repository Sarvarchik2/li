<template>
  <div class="footer">
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-first">
          <img class="footer-logo"  :src="FooterLogo" alt="logo">
          <div class="footer-first-link">
            <NuxtLink>
              <img :src="Icon1" alt="link">
            </NuxtLink>
            <NuxtLink>
              <img :src="Icon2" alt="link">
            </NuxtLink>
            <NuxtLink>
              <img :src="Icon3" alt="link">
            </NuxtLink>
            <NuxtLink>
              <img :src="Icon4" alt="link">
            </NuxtLink>
          </div>
        </div>
        <ul class="footer-list">
          <h2>Автомобили</h2>
          <li><NuxtLink to="/models">Li 9</NuxtLink></li>
          <li><NuxtLink  to="/models">Li 8</NuxtLink></li>
          <li><NuxtLink  to="/models">Li 7</NuxtLink></li>
          <li><NuxtLink  to="/models">Li 6</NuxtLink></li>
        </ul>
        <ul class="footer-list">
          <h2>Компания</h2>
          <li><NuxtLink  to="/contact">Журнал Li Auto</NuxtLink></li>
          <li><NuxtLink  to="/contact">Контакты</NuxtLink></li>
          <li><NuxtLink  to="/#about-us">О компании</NuxtLink></li>

        </ul>
        <ul class="footer-list">
          <h2>Покупка</h2>
          <li><NuxtLink  to="/contact">Найти диллера</NuxtLink></li>
          <li><NuxtLink  to="/contact">Тест - драйв</NuxtLink></li>
          <li><NuxtLink  to="/contact">Лизинг</NuxtLink></li>

          <li><NuxtLink  to="/contact">Получить предложение</NuxtLink></li>

        </ul>
        <ul class="footer-list">
          <h2>Владельцам</h2>
          <li><NuxtLink  to="/contact">Сервис</NuxtLink></li>
          <li><NuxtLink  to="/contact">Запись на сервис</NuxtLink></li>
          <li><NuxtLink  to="/market">Аксессуары</NuxtLink></li>
          <li><NuxtLink  to="/contact">Русификация</NuxtLink></li>

        </ul>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import FooterLogo from '@/assets/footer/Sub Container.png'
import Icon1 from '@/assets/footer/Button.png'
import Icon2 from '@/assets/footer/Button (1).png'
import Icon3 from '@/assets/footer/Button (2).png'
import Icon4 from '@/assets/footer/Button (3).png'
</script>
<style>
@import "./footer.css";
</style>