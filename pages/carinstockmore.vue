<template>
  <div class="car-more">
    <div v-if="loading" class="loading">Загрузка...</div>

    <template v-else-if="car">
      <div class="carousel-wrapper" v-if="car.images?.length">
        <Carousel
            v-model="currentSlide"
            :items-to-show="1"
            :wrap-around="true"
            :mouse-drag="true"
            class="carousel"
        >
          <Slide v-for="(img, i) in car.images" :key="i">
            <img :src="img.image" class="main-image" @click="openZoom(img.image)" />
          </Slide>
        </Carousel>

        <div class="carousel-scrollbar">
          <div
              class="scrollbar-fill"
              :style="{ width: (100 / car.images.length) + '%', transform: `translateX(${currentSlide * 100}%)` }"
          ></div>
        </div>
      </div>

      <div class="carousel-wrapper" v-else>
        <img :src="defaultImage" class="main-image" />
      </div>

      <div class="header">
        <h1>{{ car.car_name }}</h1>
        <div class="price-order">
          <p class="price">{{ car.price }}$</p>
          <NuxtLink class="order-button" to="/contact">{{ $t('car.request') }}</NuxtLink>
        </div>
      </div>

      <div class="info-grid">
        <div class="column">
          <p><b>{{ $t('car.status') }}:</b> {{ car.status ? $t('car.available') : $t('car.on_order') }}</p>
          <p><b>{{ $t('car.year') }}:</b> {{ car.year_production }}</p>
          <p><b>{{ $t('car.mileage') }}:</b> {{ car.mileage }} км</p>
          <p><b>{{ $t('car.body') }}:</b> {{ car.body_type }}</p>
          <p><b>{{ $t('car.configuration') }}:</b> {{ car.configuration }}</p>
          <p><b>{{ $t('car.engine') }}:</b> {{ car.engine }}</p>
          <p><b>{{ $t('car.exterior') }}:</b> {{ car.exterior }}</p>
        </div>

        <div class="column">
          <p><b>{{ $t('car.acceleration') }}:</b> {{ car.zero_to_hundred }} сек</p>
          <p><b>{{ $t('car.max_speed') }}:</b> {{ car.max_speed }} км/ч</p>
          <p><b>{{ $t('car.range') }}:</b> {{ car.range }} км</p>
          <p><b>{{ $t('car.drive') }}:</b> {{ car.drive_type }}</p>
          <p><b>{{ $t('car.transmission') }}:</b> {{ car.transmission }}</p>
          <p><b>{{ $t('car.interior') }}:</b> {{ car.interior }}</p>
        </div>

        <div class="description">
          <h2>{{ $t('car.description_title') }}</h2>
          <p>{{ car.description }}</p>

          <h2>{{ $t('car.equipment_title') }}</h2>
          <ul>
            <li v-for="(item, index) in equipmentList" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>

      <div class="zoom-modal" v-if="zoomImage" @click.self="closeZoom">
        <img :src="zoomImage" class="zoom-img" />
      </div>
    </template>

    <div v-else class="not-found">
      <h2>Автомобиль не найден</h2>
      <NuxtLink to="/carsinstock">← Назад к списку</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import defaultImage from '@/assets/li9.png'

const route = useRoute()
const car = ref(null)
const currentSlide = ref(0)
const zoomImage = ref(null)
const equipmentList = ref<string[]>([])
const loading = ref(true)

const openZoom = (img: string) => (zoomImage.value = img)
const closeZoom = () => (zoomImage.value = null)

onMounted(async () => {
  const id = route.query.id
  if (!id) return

  try {
    const response = await axios.get(`http://173.212.193.32:8001/api/available-cars/${id}/`)
    const data = response.data[0]  // <--- ВАЖНО!
    if (!data) {
      car.value = null
      return
    }
    car.value = {
      ...data,
      images: data.images || []
    }

    console.log(data)
    equipmentList.value = data.equipment ? data.equipment.split('\n') : []
  } catch (e) {
    console.error('Ошибка загрузки автомобиля:', e)
    car.value = null
  } finally {
    loading.value = false
  }
})
</script>



<style scoped>

.loading,
.not-found {
  text-align: center;
  font-size: 20px;
  padding: 50px;
  color: #777;
}
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
