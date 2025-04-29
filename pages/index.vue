<template>
  <div class="main">
    <header class="main-header">
      <img :src="Header" alt="logo"/>
      <img class="main-header-img1" :src="LiText" alt="logo"/>
    </header>
    <main class="main-content">
      <h2>Модели</h2>
      <div class="main-content-models">
        <div class="main-content-models-item">
          <img :src="Model7" alt="li7">
          <div class="main-content-models-item-text">
            <h3>L7 <span>От 40 000$</span></h3>
          </div>
        </div>
        <div class="main-content-models-item">
          <img :src="Model8" alt="li8">
          <div class="main-content-models-item-text">
            <h3>L8 <span>От 50 000$</span></h3>
          </div>
        </div>
        <div class="main-content-models-item">
          <img :src="Model9" alt="li9">
          <div class="main-content-models-item-text">
            <h3>L9 <span>От 60 000$</span></h3>
          </div>
        </div>
      </div>
      <div class="main-content-models-bottom">
        <div class="main-content-models-bottom-left">
          <h3>Lixiang 9 L9</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
            aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos.</p>
          <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
            aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
          <NuxtLink>
            Узнать больше
          </NuxtLink>
        </div>
        <div class="main-content-models-bottom-right">
          <img :src="Model9" alt="li9">
          <h3>L9 <span>От 60 000$</span></h3>
          <div class="main-content-models-bottom-right-text">
            <NuxtLink>Построй свой L9</NuxtLink>
            <NuxtLink>Все L9 модели</NuxtLink>
          </div>
        </div>
      </div>
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
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/assets/headerli.png';
import LiText from "@/assets/litext.png"
import Model7 from '@/assets/li7.png'
import Model8 from '@/assets/li8.png'
import Model9 from '@/assets/li9.png'
import Li9 from '@/assets/li99.png'
</script>

<style>
@import './index.css';
</style>