<template>
  <div class="navbar">
    <ul class="navbar-list">
      <li>
        <NuxtLink>Контакты</NuxtLink>
      </li>
      <li>
        <NuxtLink>О нас</NuxtLink>
      </li>
      <li>
        <NuxtLink>Конфигуратор</NuxtLink>
      </li>
    </ul>
    <div class="logo">
      <img :src="Logo" alt="LiLogo">
    </div>
    <ul class="navbar-list">
      <li>
        <NuxtLink>Магазин</NuxtLink>
      </li>
      <li>
        <NuxtLink>Авто в наличии</NuxtLink>
      </li>
      <li>
        <NuxtLink>Модели</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.png"


</script>


<style>
@import './navbar.css';
</style>