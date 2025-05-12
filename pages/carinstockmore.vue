<template>
  <div class="car-more">
    <div class="carousel-wrapper">
      <Carousel
          v-model="currentSlide"
          :items-to-show="1"
          :wrap-around="true"
          :mouse-drag="true"
          class="carousel"
          @slide-end="onSlideEnd"
      >
        <Slide v-for="(img, i) in images" :key="i">
          <img :src="img" class="main-image" @click="openZoom(img)" />
        </Slide>
      </Carousel>

      <div class="carousel-scrollbar">
        <div
            class="scrollbar-fill"
            :style="{ width: (100 / images.length) + '%', transform: `translateX(${currentSlide * 100}%)` }"
        ></div>
      </div>
    </div>

    <div class="header">
      <h1>LiXiang L6</h1>
      <div class="price-order">
        <p class="price">67.000$</p>
        <NuxtLink class="order-button" to="/cart">{{ $t('car.request') }}</NuxtLink>
      </div>
    </div>

    <!-- ИНФОРМАЦИЯ -->
    <div class="info-grid">
      <div class="column">
        <p><b>{{ $t('car.status') }}:</b> {{ $t('car.on_order') }}</p>
        <p><b>{{ $t('car.year') }}:</b> 2024</p>
        <p><b>{{ $t('car.mileage') }}:</b> 1 км</p>
        <p><b>{{ $t('car.body') }}:</b> {{ $t('car.suv_5d') }}</p>
        <p><b>{{ $t('car.configuration') }}:</b> Pro</p>
        <p><b>{{ $t('car.engine') }}:</b> 1.5 л / 408 л.с / {{ $t('car.hybrid') }}</p>
        <p><b>{{ $t('car.exterior') }}:</b> {{ $t('car.black') }}</p>
      </div>

      <div class="column">
        <p><b>{{ $t('car.acceleration') }}:</b> 5.3 сек</p>
        <p><b>{{ $t('car.max_speed') }}:</b> 180 км/ч</p>
        <p><b>{{ $t('car.range') }}:</b> 182 км</p>
        <p><b>{{ $t('car.drive') }}:</b> {{ $t('car.awd') }}</p>
        <p><b>{{ $t('car.transmission') }}:</b> {{ $t('car.auto') }}</p>
        <p><b>{{ $t('car.interior') }}:</b> {{ $t('car.white_leather') }}</p>
      </div>

      <div class="description">
        <h2>{{ $t('car.description_title') }}</h2>
        <p>{{ $t('car.description_text') }}</p>

        <h2>{{ $t('car.equipment_title') }}</h2>
        <ul>
          <li>{{ $t('car.equipment.fog') }}</li>
          <li>{{ $t('car.equipment.drl') }}</li>
          <li>{{ $t('car.equipment.headlight_adjust') }}</li>
          <li>{{ $t('car.equipment.led') }}</li>
          <li>{{ $t('car.equipment.windshield_heating') }}</li>
          <li>{{ $t('car.equipment.mirror_heating') }}</li>
          <li>{{ $t('car.equipment.nozzle_heating') }}</li>
        </ul>
      </div>
    </div>

    <!-- МОДАЛКА ЗУМА -->
    <div class="zoom-modal" v-if="zoomImage" @click.self="closeZoom">
      <img :src="zoomImage" class="zoom-img" />
    </div>
  </div>
</template>

<script setup>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

import Li1 from '@/assets/carinstock.png'
import Li2 from '@/assets/li7.png'
import Li3 from '@/assets/li6.png'

const images = [Li1, Li2, Li3]
const currentSlide = ref(0)
const zoomImage = ref(null)

function openZoom(img) {
  zoomImage.value = img
}
function closeZoom() {
  zoomImage.value = null
}
</script>

<style scoped>
.car-more {
  font-family: Arial, sans-serif;
  margin-top: 50px;
}

/* КАРУСЕЛЬ */
.carousel-wrapper {
  position: relative;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
}

.carousel {
  border-radius: 20px;
}

.main-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  cursor: zoom-in;
}

.carousel-scrollbar {
  height: 4px;
  background-color: #e0e0e0;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
}

.scrollbar-fill {
  height: 100%;
  background-color: #333;
  transition: transform 0.3s ease;
}

/* ХЕДЕР */
.header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
}

.price-order {
  display: flex;
  align-items: center;
  gap: 20px;
}

.price {
  font-size: 24px;
  font-weight: bold;
}

.order-button {
  background: #BFBFBF;
  color: white;
  border: none;
  text-decoration: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 20px;
}

/* СЕТКА */
.info-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.column {
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
}
.column p{
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #999999;
  gap: 10px;
}
.column p b{
  color: #000;
  font-size: 18px;
}
.description {
  flex: 2 1 400px;
}
.description p {
  color: #999999;
}
.description ul{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.description ul li{
  color: #999999;
}

.description h2 {
  font-size: 20px;
  margin-top: 10px;
}

.description ul {
  padding-left: 20px;
  list-style-type: disc;
}

/* МОДАЛЬНОЕ УВЕЛИЧЕНИЕ */
.zoom-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: zoom-out;
}

.zoom-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

/* АДАПТИВНОСТЬ */
@media (max-width: 768px) {
  .main-image {
    height: 260px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .info-grid {
    flex-direction: column;
  }

  .description {
    order: -1;
  }
}
</style>
