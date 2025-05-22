<template>
  <div class="stock">
    <h1>{{ $t('stock.title') }}</h1>

    <div v-if="cars.length" class="stock-wrapper">
      <div v-for="car in cars" :key="car.id" class="stock-item">
        <img
            :src="car.preview_image"
            alt="car image"
        />
        <div class="stock-item-text">
          <h3>{{ car.car_name }} {{ car.year_production }}</h3>
          <p>{{ shortenText(car.description, 200) }}</p>
          <h4>{{ car.price }}$ <NuxtLink :to="`/carinstockmore?id=${car.id}`">{{ $t('stock.more') }}</NuxtLink></h4>
        </div>
      </div>
    </div>

    <div v-else class="no-cars">
      {{ $t('stock.empty') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import {useI18n} from "vue-i18n";


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
const { t, locale } = useI18n()
const shortenText = (text: string, limit = 200) => {
  if (!text) return ''
  return text.length > limit ? text.substring(0, limit) + '...' : text
}
onMounted(async () => {
  try {
    const response = await axios.get('https://api.lixiang-uzbekistan.uz/api/available-cars/', {
      headers: {
        'Accept-Language': locale.value
      }
    })
    cars.value = response.data


  } catch (error) {
    console.error('Ошибка при загрузке машин:', error)
  }
})

useHead(() => ({
  title: t('seo.stock.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.stock.description')
    },
    {
      name: 'keywords',
      content: t('seo.stock.keywords')
    },
    {
      property: 'og:title',
      content: t('seo.stock.og_title')
    },
    {
      property: 'og:description',
      content: t('seo.stock.og_description')
    },
    {
      property: 'og:image',
      content: 'https://lixiang-uzbekistan.uz/logoblack.jpg'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://lixiang-uzbekistan.uz${locale.value !== 'ru' ? '/' + locale.value : ''}/carsinstock`
    }
  ]
}))

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
