<template>
  <div class="footer">
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-first">
          <img class="footer-logo" :src="FooterLogo" alt="logo" />
          <div class="footer-first-link">
            <NuxtLink><img :src="Icon1" alt="link" /></NuxtLink>
            <NuxtLink><img :src="Icon2" alt="link" /></NuxtLink>
            <NuxtLink><img :src="Icon3" alt="link" /></NuxtLink>
            <NuxtLink><img :src="Icon4" alt="link" /></NuxtLink>
          </div>
        </div>

        <ul class="footer-list">
          <h2>{{ $t('footer.cars') }}</h2>
          <li><NuxtLink to="/models">Li 9</NuxtLink></li>
          <li><NuxtLink to="/models">Li 8</NuxtLink></li>
          <li><NuxtLink to="/models">Li 7</NuxtLink></li>
          <li><NuxtLink to="/models">Li 6</NuxtLink></li>
        </ul>

        <ul class="footer-list">
          <h2>{{ $t('footer.company') }}</h2>
          <li><NuxtLink to="/contact">{{ $t('footer.magazine') }}</NuxtLink></li>
          <li><NuxtLink to="/contact">{{ $t('footer.contacts') }}</NuxtLink></li>
          <li><NuxtLink to="/#about-us">{{ $t('footer.about') }}</NuxtLink></li>
        </ul>

        <ul class="footer-list">
          <h2>{{ $t('footer.purchase') }}</h2>
          <li><NuxtLink to="/contact">{{ $t('footer.find_dealer') }}</NuxtLink></li>
          <li><NuxtLink to="/contact">{{ $t('footer.test_drive') }}</NuxtLink></li>
          <li><NuxtLink to="/contact">{{ $t('footer.leasing') }}</NuxtLink></li>
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
import FooterLogo from '@/assets/footer/Sub Container.png'
import Icon1 from '@/assets/footer/Button.png'
import Icon2 from '@/assets/footer/Button (1).png'
import Icon3 from '@/assets/footer/Button (2).png'
import Icon4 from '@/assets/footer/Button (3).png'
</script>
<style>
@import "./footer.css";
</style>