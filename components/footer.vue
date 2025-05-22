<template>
  <div class="footer">
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-first">
          <img class="footer-logo" :src="FooterLogo" alt="logo" />
          <div class="footer-first-link">
            <NuxtLink to="https://www.facebook.com/share/15egaUiuFb/?mibextid=wwXIfr"><img :src="Icon1" alt="link" /></NuxtLink>
            <NuxtLink to="https://www.instagram.com/_yas_auto_/profilecard/?igsh=bGt5emFiY2QxaHNy"><img :src="Icon2" alt="link" /></NuxtLink>
            <NuxtLink to="https://t.me/yas_auto"><img :src="Icon4" alt="link" /></NuxtLink>
          </div>
        </div>

        <ul class="footer-list">
          <h2>{{ $t('footer.cars') }}</h2>
          <li><NuxtLink to="/models">Li 9</NuxtLink></li>
          <li><NuxtLink to="/models">Li 7</NuxtLink></li>
          <li><NuxtLink to="/models">Li 6</NuxtLink></li>
        </ul>

        <ul class="footer-list">
          <h2>{{ $t('footer.company') }}</h2>
          <li><NuxtLink to="/contact">{{ $t('footer.contacts') }}</NuxtLink></li>
          <li><NuxtLink to="/#about-us">{{ $t('footer.about') }}</NuxtLink></li>
        </ul>

        <ul class="footer-list">
          <h2>{{ $t('footer.purchase') }}</h2>
          <li><NuxtLink to="/contact">{{ $t('footer.test_drive') }}</NuxtLink></li>
          <li><NuxtLink to="/contact">{{ $t('footer.offer') }}</NuxtLink></li>
        </ul>

        <ul class="footer-list">
          <h2>{{ $t('footer.owners') }}</h2>
          <li><NuxtLink to="/contact">{{ $t('footer.service') }}</NuxtLink></li>
          <li><NuxtLink to="/contact">{{ $t('footer.service_booking') }}</NuxtLink></li>
          <li><NuxtLink to="/market">{{ $t('footer.accessories') }}</NuxtLink></li>
          <li><NuxtLink to="/contact">{{ $t('footer.rus') }}</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FooterLogo from '@/assets/logowhite.png'
import Icon1 from '@/assets/footer/Button (1).png'
import Icon2 from '@/assets/footer/inst.png'
import Icon4 from '@/assets/footer/telegram.png'
</script>
<style>
@import "./footer.css";
</style>