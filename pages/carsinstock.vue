<template>
  <div class="stock">
    <h1>Авто в наличии</h1>
    <div class="stock-wrapper">
      <div class="stock-item">
        <img :src="Li6" alt="lixiang">
        <div class="stock-item-text">
          <h3>LiXiang L6 2024</h3>
          <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.</p>
          <h4>67000$ <NuxtLink to="/carinstockmore">Подробнее</NuxtLink></h4>
        </div>
      </div>
      <div class="stock-item">
        <img :src="Li7" alt="lixiang">
        <div class="stock-item-text">
          <h3>LiXiang L7 2024</h3>
          <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.</p>
          <h4>77000$ <NuxtLink to="/carinstockmore">Подробнее</NuxtLink></h4>
        </div>
      </div>
      <div class="stock-item">
        <img :src="Li7" alt="lixiang">
        <div class="stock-item-text">
          <h3>LiXiang L7 2024</h3>
          <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.</p>
          <h4>77000$ <NuxtLink to="/carinstockmore">Подробнее</NuxtLink></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Li6 from "@/assets/li9.png";
import Li7 from "@/assets/li7.png";
</script>

<style>
@import "./carsinstock.css";
</style>