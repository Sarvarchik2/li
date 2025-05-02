<template>
  <div class="model-more">
    <div class="main-content-model">
      <h3>Один клик к вашему новому Lixiang
        <span>Создайте свой идеальный LiXiang с помощью конфигуратора</span>
      </h3>
      <img :src="Li9" alt="">
      <div class="main-content-model-content">
        <div class="main-content-models-item-text">
          <div class="main-content-models-item-text-item">
            <h4>5 218 мм</h4>
            <p>Длина</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>1 998 мм</h4>
            <p>Ширина</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>1 800 мм</h4>
            <p>Высота</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>3 105 мм</h4>
            <p>Колесзная база</p>
          </div>
        </div>
        <NuxtLink class="main-content-models-item-link">
          Конфигуратор
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Li9 from "assets/Li99.png";
</script>

<style>
@import "model-more.css";
</style>