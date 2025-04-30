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