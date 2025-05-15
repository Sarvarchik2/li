<template>
  <div class="stock">
    <h1>Авто в наличии</h1>

    <div v-if="cars.length" class="stock-wrapper">
      <div v-for="car in cars" :key="car.id" class="stock-item">
        <img
            :src="car.images.length ? car.images[0].image : defaultImage"
            alt="car image"
        />
        <div class="stock-item-text">
          <h3>{{ car.car_name }} {{ car.year_production }}</h3>
          <p>{{ car.description }}</p>
          <h4>{{ car.price }}$ <NuxtLink :to="`/carinstockmore?id=${car.id}`">Подробнее</NuxtLink></h4>
        </div>
      </div>
    </div>

    <div v-else class="no-cars">
      К сожелению пока нет машин в наличие.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import defaultImage from '@/assets/li9.png'

interface CarImage {
  id: number
  image: string
}

interface AvailableCar {
  id: number
  car_name: string
  price: number
  description: string
  year_production: number
  images: CarImage[]
}

const cars = ref<AvailableCar[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('http://173.212.193.32:8001/api/available-cars/')
    cars.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке машин:', error)
  }
})
</script>

<style scoped>
@import "./carsinstock.css";

.no-cars {
  text-align: center;
  font-size: 18px;
  color: gray;
  padding: 40px;
}
</style>
