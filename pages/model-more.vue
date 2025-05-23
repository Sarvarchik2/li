<template>
  <div class="model-more" v-if="model">
    <!-- Основная информация -->
    <div class="main-content-model">
      <h3>{{ $t('model.title', { name: model.name }) }}
        <span>{{ $t('model.subtitle', { name: model.name }) }}</span>
      </h3>
      <img :src="activeColorImage" alt="car" class="car-image" />
      <div class="main-content-model-content">
        <div class="main-content-models-item-text">
          <div class="main-content-models-item-text-item">
            <h4>{{ model.length }} мм</h4>
            <p>{{ $t('model.length') }}</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>{{ model.width }} мм</h4>
            <p>{{ $t('model.width') }}</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>{{ model.height }} мм</h4>
            <p>{{ $t('model.height') }}</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>{{ model.wheelbase }} мм</h4>
            <p>{{ $t('model.wheelbase') }}</p>
          </div>
        </div>
        <NuxtLink :to="`/configurator?id=${model.id}`" class="main-content-models-item-link">
          {{ $t('buttons.configurator') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Технические параметры -->
    <div class="model-more-config">
      <div class="model-more-config-item">
        <img :src="Fuel" alt="fuel"/>
        <h3>
          {{ model.power_reserve }} км
          <span>{{ $t('model.power_reserve') }}</span>
        </h3>
      </div>
      <div class="model-more-config-item">
        <img :src="History" alt="0-100"/>
        <h3>
          {{ model.zero_to_hundred }} сек
          <span>{{ $t('model.zero_to_hundred') }}</span>
        </h3>
      </div>
      <div class="model-more-config-item">
        <img :src="Speed" alt="speed"/>
        <h3>
          {{ model.max_speed }} км/ч
          <span>{{ $t('model.max_speed') }}</span>
        </h3>
      </div>
      <div class="model-more-config-item">
        <img :src="Gps" alt="autopilot"/>
        <h3>
          {{ model.autopilot ? $t('model.autopilot_on') : $t('model.autopilot_off') }}
          <span>{{ model.autopilot_description }}</span>
        </h3>
      </div>
    </div>

    <!-- Цвет кузова -->
    <div class="model-more-color" v-if="model.color?.length">
      <h3>{{ $t('model.color_title') }}</h3>
      <img :src="activeColorImage" alt="car" class="car-image" />
      <div class="model-more-color-wrapper">

        <div
            v-for="(color, index) in model.color"
            :key="color.id"
            class="model-more-color-wrapper-item"
            :class="{ active: selectedColorIndex === index }"
            @click="setColor(index)"
        >
          <span :style="{ backgroundColor: color.hex_code }"></span>
          <h2>{{ color.name }}</h2>
        </div>
      </div>
    </div>

    <!-- Интерьеры -->
    <div class="model-more-interier" v-if="model.interior_desc?.length">
      <h2>{{ model.interior_desc[0].title }}
        <span v-html="model.interior_desc[0].description"></span>
      </h2>
      <div class="model-more-interier-wrapper">
        <div class="model-more-interier-item" v-for="option in model.interior_desc[0].interior_options" :key="option.id">
          <img :src="option.image" alt="interior option"/>
          <h4>{{ option.title }}</h4>
        </div>
      </div>
    </div>

    <!-- Электрическая информация -->
    <div class="model-more-interier" v-if="model.electric_information?.length">
      <h2>{{ model.electric_information[0].title }}
        <span>{{ model.electric_information[0].description }}</span>
      </h2>
      <div class="model-more-interier-wrapper">
        <div class="model-more-interier-item" v-for="item in model.electric_information[0].electric_options" :key="item.id">
          <img :src="item.image" alt="electric option"/>
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Умная система вождения -->
    <div class="smart-driving" v-if="model.smart_drive_system?.length">
      <div class="smart-driving-text">
        <h2>{{ model.smart_drive_system[0].title }}</h2>
        <h3>{{ model.smart_drive_system[0].sub_title }}</h3>
        <p>{{ model.smart_drive_system[0].description }}</p>
      </div>
      <div class="smart-driving-content">
        <img :src="model.smart_drive_system[0].image" alt="smart-driving" />
        <div class="smart-driving-boxes">
          <div class="smart-driving-box" v-for="opt in model.smart_drive_system[0].smart_drive_options" :key="opt.id">
            <h4>{{ opt.title }}</h4>
            <p>{{ opt.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Переключатели ADAS -->
    <div class="model-more-adas-tabs" v-if="model.driving_assistance?.length">
      <div class="adas-tab-group">
        <button
            v-for="(opt, index) in model.driving_assistance"
            :key="opt.id"
            :class="{ active: selectedAdasIndex === index }"
            @click="setAdas(index)"
        >
          {{ opt.title }}
        </button>
      </div>
      <img :src="model.driving_assistance[selectedAdasIndex].image" alt="ADAS Image" class="adas-image" />
    </div>

    <!-- Безопасность -->
    <div class="safety-section" v-if="model.safety?.length">
      <h2>{{ model.safety[0].title }}</h2>
      <p class="safety-subtitle">{{ model.safety[0].description }}</p>
      <div class="safety-grid">
        <div class="safety-feature" v-for="item in model.safety[0].safety_options" :key="item.id">
          <img :src="item.image" alt="safety" />
          <div class="safety-text-block">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Гибридная система -->
    <div class="hybrid-section" v-if="model.electro_hybrid?.length">
      <h2>{{ model.electro_hybrid[0].title }}</h2>
      <p class="subtitle">{{ model.electro_hybrid[0].description }}</p>
      <div class="hybrid-row" v-for="(item, index) in model.electro_hybrid[0].electro_hybrid_options" :key="item.id" :class="{ reverse: index % 2 !== 0 }">
        <div class="hybrid-image">
          <img :src="item.image" :alt="item.title" />
        </div>
        <div class="hybrid-text">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
    <div class="video-section" v-if="model.videos?.length">
      <h2>{{ $t('model.video') }}</h2>
      <div class="video-grid">
        <div
            class="video-card"
            v-for="(video, index) in model.videos"
            :key="index"
            @click="openVideo(getYoutubeId(video.video_url))"
        >
          <img :src="getYoutubeThumbnail(video.video_url)" alt="video" />
          <div class="video-overlay">
            <div class="play-button"></div>
          </div>
        </div>
      </div>

      <div v-if="activeVideo" class="video-modal" @click.self="closeVideo">
        <iframe
            :src="`https://www.youtube.com/embed/${activeVideo}?autoplay=1`"
            frameborder="0"
            allowfullscreen
        ></iframe>
        <button class="close-btn" @click="closeVideo">×</button>
      </div>
    </div>

  </div>
  <div v-else>{{ $t('loading') }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useHead } from '#imports'

import Fuel from '@/assets/models/fuel.png'
import Speed from '@/assets/models/speed.png'
import History from '@/assets/models/history.png'
import Gps from '@/assets/models/gps.png'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const model = ref<any>(null)

const selectedAdasIndex = ref(0)
const setAdas = (index: number) => {
  selectedAdasIndex.value = index
}

const selectedColorIndex = ref(0)
const setColor = (index: number) => {
  selectedColorIndex.value = index
}

const activeColorImage = computed(() => {
  return model.value?.color?.[selectedColorIndex.value]?.image || ''
})
const activeVideo = ref<string | null>(null)

const openVideo = (id: string) => {
  activeVideo.value = id
}

const closeVideo = () => {
  activeVideo.value = null
}

const getYoutubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/)
  return match ? match[1] : ''
}

const getYoutubeThumbnail = (url: string): string => {
  const id = getYoutubeId(url)
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}
const {  t,locale } = useI18n()
onMounted(async () => {
  try {
    const res = await axios.get(`https://api.lixiang-uzbekistan.uz/api/models/${route.query.id}/`, {
      headers: {
        'Accept-Language': locale.value
      }
    })
    model.value = res.data
    const car = res.data
    useHead({
      title: `${car.name} — ${t('seo.model.title_seo') || 'Электромобиль Lixiang'}`,
      meta: [
        {
          name: 'description',
          content: car.smart_drive_system?.[0]?.description || t('seo.model.description_seo') || 'Официальный дилер YasAuto. Подробности и характеристики модели.'
        },
        {
          property: 'og:title',
          content: `${car.name} — ${t('seo.model.title_seo') || 'Электромобиль Lixiang'}`
        },
        {
          property: 'og:description',
          content: car.smart_drive_system?.[0]?.description || t('seo.model.description_seo')
        },
        {
          property: 'og:image',
          content: car.color?.[0]?.image || 'https://lixiang-uzbekistan.uz/logoblack.jpg'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://lixiang-uzbekistan.uz${locale.value !== 'ru' ? '/' + locale.value : ''}/model-more?id=${car.id}`
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": car.name,
            "image": car.color?.[0]?.image || 'https://lixiang-uzbekistan.uz/logoblack.jpg',
            "description": car.smart_drive_system?.[0]?.description || 'Электромобиль Lixiang',
            "brand": {
              "@type": "Brand",
              "name": "Lixiang"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": car.price,
              "availability": "https://schema.org/InStock",
              "url": `https://lixiang-uzbekistan.uz${locale.value !== 'ru' ? '/' + locale.value : ''}/model-more?id=${car.id}`
            }
          })
        }
      ]
    })


  } catch (err) {
    console.error('Ошибка загрузки модели:', err)
  }
})
</script>

<style scoped>
@import "./model-more.css";


</style>
