<template>
  <div class="product-page">
    <div class="product-card">
      <!-- КАРУСЕЛЬ -->
      <div class="carousel-wrapper">
        <Carousel :items-to-show="1" :wrap-around="true" v-model="currentSlide">
          <Slide v-for="(img, i) in images" :key="i">
            <img :src="img" class="carousel-img" />
          </Slide>
        </Carousel>
        <!-- Scrollbar -->
        <div class="carousel-scrollbar">
          <div class="scrollbar-fill" :style="{ width: (100 / images.length) + '%', transform: `translateX(${currentSlide * 100}%)` }" />
        </div>
      </div>

      <!-- ИНФО -->
      <div class="info-wrapper">
        <h2 class="name">Lixiang Oufer-Nell</h2>
        <p class="category">Обвес корпуса</p>
        <p class="description">
          Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum,
          ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
        </p>

        <div class="price-line">
          <span class="label">Цена</span>
          <span class="price">600$</span>
        </div>

        <div class="quantity">
          <label>Количество товара</label>
          <div class="quantity-controls">
            <button @click="decrement">−</button>
            <span>{{ quantity }}</span>
            <button @click="increment">+</button>
          </div>
        </div>

        <div class="buttons">
          <button class="add-btn" :disabled="quantity === 0">Добавить в корзину</button>
          <button class="go-btn">
            <span class="icon"><img :src="Cart" alt="asd"></span> Перейти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import Cart from '@/assets/cart.png'

// Картинки продукта
import img1 from '@/assets/market2.png'
import img2 from '@/assets/market.png'

const images = [img1, img2]
const currentSlide = ref(0)
const quantity = ref(1)

const increment = () => quantity.value++
const decrement = () => {
  if (quantity.value > 1) quantity.value--
}
</script>

<style scoped>
.product-page {
  background: #f7f7f7;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.product-card {
  width: 100%;
  display: flex;
  gap: 40px;
  border-radius: 30px;
}

/* Карусель */
.carousel-wrapper {
  flex: 1;
  border-radius: 16px;
  padding: 15px;
  overflow: hidden;
  background: #fff;
  position: relative;

}
.carousel-img {
  width: 70%;
  height: 400px;
  object-fit: contain;

}
.carousel-scrollbar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.scrollbar-fill {
  height: 100%;
  background: #333;
  transition: transform 0.3s ease;
}

/* Инфо */
.info-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 24px;
  font-weight: bold;
}
.category {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 20px;
}
.description {
  font-size: 14px;
  color: #777;
  margin-bottom: 30px;
}
.price-line {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 20px;
}
.price-line .label {
  color: #aaa;
}
.price-line .price {
  font-weight: bold;
  font-size: 20px;
}

/* Количество */
.quantity {
  margin-bottom: 20px;
}
.quantity label {
  font-weight: bold;
  font-size: 16px;
}
.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  width: max-content;
  border-radius: 999px;
  padding: 5px 14px;
  gap: 16px;
  margin-top: 10px;
}
.quantity-controls button {
  background: none;
  border: none;
  font-size: 20px;
  width: 26px;
  height: 26px;
  cursor: pointer;
}

/* Кнопки */
.buttons {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
.add-btn {
  background: #ccc;
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 15px;
  cursor: pointer;
}
.go-btn {
  background: white;
  border: 1px solid #ccc;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.go-btn .icon {
  font-size: 18px;
}

/* Адаптив */
@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
  }
  .carousel-img {
    height: 260px;
  }
}
</style>
