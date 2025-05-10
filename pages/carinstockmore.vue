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
        <NuxtLink class="order-button" to="/cart">Заявка дилеру</NuxtLink>
      </div>
    </div>

    <!-- ИНФОРМАЦИЯ -->
    <div class="info-grid">
      <div class="column">
        <p><b>Статус:</b> На заказ</p>
        <p><b>Год выпуска:</b> 2024</p>
        <p><b>Пробег:</b> 1 км</p>
        <p><b>Кузов:</b> Внедорожник 5 дв.</p>
        <p><b>Комплектация:</b> Pro</p>
        <p><b>Двигатель:</b> 1.5 л / 408 л.с / Гибрид</p>
        <p><b>Экстерьер:</b> Черный</p>
      </div>

      <div class="column">
        <p><b>Разгон до 100:</b> 5.3 сек</p>
        <p><b>Макс. скорость:</b> 180 км/ч</p>
        <p><b>Запас хода:</b> 182 км</p>
        <p><b>Привод:</b> Полный</p>
        <p><b>Коробка передач:</b> Автомат</p>
        <p><b>Интерьер:</b> Белый, кожа</p>
      </div>

      <div class="description">
        <h2>Описание</h2>
        <p>
          LiXiang L6 — современный гибридный внедорожник с высокой динамикой, полным приводом и элегантным дизайном.
        </p>

        <h2>Комплектация</h2>
        <ul>
          <li>Противотуманные фары</li>
          <li>Дневные ходовые огни</li>
          <li>Автоматический корректор фар</li>
          <li>Светодиодные фары</li>
          <li>Электрообогрев лобового стекла</li>
          <li>Электрообогрев боковых зеркал</li>
          <li>Электрообогрев форсунок</li>
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
