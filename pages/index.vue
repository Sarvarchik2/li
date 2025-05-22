<template>
  <div class="main">
    <header class="main-header">
      <img :src="Header" alt="logo" />
      <img class="main-header-img1" :src="LiText" alt="logo" />
    </header>

    <main class="main-content">

      <h2>{{ $t('main.models') }}</h2>
      <div class="main-content-models">
        <NuxtLink
            v-for="car in models"
            :key="car.id"
            :to="`/model-more?id=${car.id}`"
            class="main-content-models-item"
        >
          <img :src="car.preview_image" :alt="car.name" />
          <div class="main-content-models-item-text">
            <h3>{{ car.name }} <span>{{ formatPrice(car.price) }} {{ $t('main.from') }}</span></h3>
          </div>
        </NuxtLink>
      </div>
      <div v-if="modelL9" class="main-content-models-bottom">
        <div class="main-content-models-bottom-left">
          <h3>{{ modelL9.name }}</h3>
          <p>{{ modelL9.description || $t('main.lorem_text') }}</p>
          <NuxtLink :to="`/model-more?id=${modelL9.id}`">{{ $t('main.learn_more') }}</NuxtLink>
        </div>

        <div class="main-content-models-bottom-right">
          <img :src="modelL9.preview_image" :alt="modelL9.name" />
          <h3>{{ modelL9.name }} <span>{{ formatPrice(modelL9.price) }} {{ $t('main.from') }}</span></h3>
          <div class="main-content-models-bottom-right-text">
            <NuxtLink :to="`/model-more?id=${modelL9.id}`">{{ $t('main.build_l9') }}</NuxtLink>
            <NuxtLink :to="`/model-more?id=${modelL9.id}`">{{ $t('main.all_l9') }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="main-content-model">
        <h3>{{ $t('main.one_click') }}<span>{{ $t('main.create_ideal') }}</span></h3>
        <img :src="Li9" alt="" />
        <div class="main-content-model-content">
          <div class="main-content-models-item-text">
            <div class="main-content-models-item-text-item">
              <h4>5 218 мм</h4>
              <p>{{ $t('main.length') }}</p>
            </div>
            <div class="main-content-models-item-text-item">
              <h4>1 998 мм</h4>
              <p>{{ $t('main.width') }}</p>
            </div>
            <div class="main-content-models-item-text-item">
              <h4>1 800 мм</h4>
              <p>{{ $t('main.height') }}</p>
            </div>
            <div class="main-content-models-item-text-item">
              <h4>3 105 мм</h4>
              <p>{{ $t('main.wheelbase') }}</p>
            </div>
          </div>
          <NuxtLink to="/models" class="main-content-models-item-link">
            {{ $t('main.configurator') }}
          </NuxtLink>
        </div>
      </div>

      <div class="main-content-market">
        <h3>{{ $t('main.shop') }}</h3>

        <div v-if="loading" class="loading">Загрузка...</div>

        <div v-else-if="products.length" class="main-content-market-wrapper">
          <div
              v-for="product in products.slice(0, 6)"
              :key="product.id"
              class="main-content-market-item"
          >
            <img
                :src="product.images.length ? product.images[0].img : '/fallback.png'"
                :alt="product.name"
            />
            <h4>{{ product.name }}</h4>
            <p>{{ $t('main.category') }}: {{ product.category }}</p>
            <h5>{{ formatPrice(product.price) }} $</h5>
            <NuxtLink :to="`/productmore?id=${product.id}`">
              {{ $t('main.more') }}
            </NuxtLink>
          </div>
        </div>

        <div v-else class="empty">{{ $t('main.no_products') }}</div>

        <NuxtLink to="/market" class="main-content-models-item-link">
          {{ $t('main.see_more') }}
        </NuxtLink>
      </div>


      <div class="main-content-contact">
        <h3>{{ $t('main.contact') }}</h3>
        <div class="main-content-contact-wrapper">
          <div class="main-content-contact-left">
            <h4>{{ $t('main.branches') }}</h4>
            <button>Ташкент</button>
            <h4>{{ $t('main.address') }}</h4>
            <p>Малая кольцевая дорога 4/1 блок 4</p>

            <div class="main-content-contact-left-info">
              <div class="main-content-contact-left-info-item">
                <h4>{{ $t('main.phone') }}</h4>
                <NuxtLink>+998 (77) 343 99 99</NuxtLink>
                <NuxtLink>+998 (20) 009 05 55</NuxtLink>
              </div>
              <div class="main-content-contact-left-info-item">
                <h4>{{ $t('main.worktime') }}</h4>
                <NuxtLink>{{ $t('main.weekdays') }}</NuxtLink>
                <NuxtLink>{{ $t('main.weekends') }}</NuxtLink>
              </div>
            </div>
          </div>
          <div class="main-content-contact-right">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.135533100059!2d69.31460419999999!3d41.3276661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5bd2c77a2f9%3A0x9328b277ea123405!2zNC8xINCx0LvQvtC6IDQ!5e0!3m2!1sru!2s!4v1747893666524!5m2!1sru!2s" style="border:0;"loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <NuxtLink to="/contact" class="main-content-models-item-link">
          {{ $t('main.leave_request') }}
        </NuxtLink>
      </div>

      <div class="main-content-about" id="about-us">
        <h3>{{ $t('main.about') }}</h3>

        <div class="main-content-about-wrapper">
          <img :src="Video" alt="video" />
          <div class="main-content-about-text">
            <h2>{{ $t('main.about_block1_title') }}</h2>
            <p>{{ $t('main.about_block1_text') }}</p>
          </div>
        </div>

        <div class="main-content-about-wrapper">
          <div class="main-content-about-text">
            <h2>{{ $t('main.about_block2_title') }}</h2>
            <p>{{ $t('main.about_block2_text') }}</p>
          </div>
          <img :src="Video2" alt="video" />
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/assets/headerli.png'
import LiText from '@/assets/litext.png'
import Li9 from '@/assets/Li99.png'
import Video from '@/assets/vid1.png'
import Video2 from '@/assets/vid1.png'

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

interface ProductImage {
  id: number
  product: number
  img: string
}

interface Product {
  id: number
  name: string
  price: number
  category: string
  images: ProductImage[]
}

const { locale } = useI18n()
const products = ref<Product[]>([])
const loading = ref(true)



onMounted(async () => {
  try {
    const response = await axios.get('https://api.lixiang-uzbekistan.uz/api/market-models/', {
      headers: {
        'Accept-Language': locale.value
      }
    })
    products.value = response.data
  } catch (e) {
    console.error('❌ Ошибка загрузки товаров:', e)
  } finally {
    loading.value = false
  }
})


interface CarModel {
  id: number
  name: string
  price: number
  preview_image: string
}

const models = ref<CarModel[]>([])
const modelL9 = ref<CarModel | null>(null)


onMounted(async () => {
  try {
    const res = await axios.get('https://api.lixiang-uzbekistan.uz/api/models/', {
      headers: {
        'Accept-Language': locale.value
      }
    })

    models.value = res.data.slice(0, 3)
    modelL9.value = res.data.find((m: CarModel) => m.name.toLowerCase().includes('l9'))
  } catch (err) {
    console.error('Ошибка загрузки моделей:', err)
  }
})

const formatPrice = (val: number) => {
  return `${val.toLocaleString('ru-RU', { minimumFractionDigits: 0 })}`
}


</script>

<style>
@import './index.css';
</style>
