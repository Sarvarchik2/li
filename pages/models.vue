<template>
  <div class="models">
    <h2>Модели</h2>
    <div class="main-content-models">
      <NuxtLink to="/model-more" class="main-content-models-item">
        <img :src="Model6" alt="li7">
        <div class="main-content-models-item-text">
          <h3>L6 <span>От 30 000$</span></h3>
        </div>
      </NuxtLink>
      <NuxtLink to="/model-more" class="main-content-models-item">
        <img :src="Model7" alt="li7">
        <div class="main-content-models-item-text">
          <h3>L7 <span>От 40 000$</span></h3>
        </div>
    </NuxtLink>
      <NuxtLink to="/model-more" class="main-content-models-item">
        <img :src="Model8" alt="li8">
        <div class="main-content-models-item-text">
          <h3>L8 <span>От 50 000$</span></h3>
        </div>
      </NuxtLink>
      <NuxtLink to="/model-more" class="main-content-models-item">
        <img :src="Model9" alt="li9">
        <div class="main-content-models-item-text">
          <h3>L9 <span>От 60 000$</span></h3>
        </div>
      </NuxtLink>
      <NuxtLink to="/model-more" class="main-content-models-item">
        <img :src="Model10" alt="li7">
        <div class="main-content-models-item-text">
          <h3>Mega <span>От 80 000$</span></h3>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import Model7 from "assets/li7.png";
import Model8 from "assets/li8.png";
import Model9 from "assets/li9.png";
import Model6 from "assets/li6.png";
import Model10 from "assets/mega.png";
</script>

<style>
@import "./models.css";
</style>