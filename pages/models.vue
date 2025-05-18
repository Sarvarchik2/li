<template>
  <div class="models">
    <h2>{{ $t('main.models') }}</h2>

    <div class="main-content-models">
      <NuxtLink
          v-for="model in models"
          :key="model.id"
          :to="{ path: '/model-more', query: { id: model.id } }"
          class="main-content-models-item"
      >
        <img :src="model.preview_image" :alt="model.name || 'Model'" />
        <div class="main-content-models-item-text">
          <h3>
            {{ model.name || 'Li' }}
            <span>{{ $t('main.from') }} {{ model.price.toLocaleString() }}$</span>
          </h3>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {useI18n} from "vue-i18n";

const models = ref([])
const { locale } = useI18n()

onMounted(async () => {
  try {
    const response = await axios.get('https://api.lixiang-uzbekistan.uz/api/models/', {
      headers: {
        'Accept-Language': locale.value
      }
    })
    models.value = response.data.filter(model => model.is_available)
  } catch (error) {
    console.error('Ошибка загрузки моделей:', error)
  }
})
</script>

<style>
@import './models.css';
</style>
