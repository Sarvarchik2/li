<template>
  <div class="model-more" v-if="model">
    <!-- H1 для SEO -->
    <h1 class="sr-only">
      {{ t('model.title', { name: model.name }) }}
    </h1>

    <!-- Основная информация -->
    <div class="main-content-model">
      <h2>
        {{ t('model.title', { name: model.name }) }}
        <span>{{ t('model.subtitle', { name: model.name }) }}</span>
      </h2>

      <img
          :src="activeColorImage"
          alt="Автомобиль {{ model.name }}"
          class="car-image"
          loading="lazy"
          width="1280"
          height="720"
      />

      <div class="main-content-model-content">
        <div class="main-content-models-item-text">
          <div class="main-content-models-item-text-item">
            <h4>{{ model.length }} мм</h4>
            <p>{{ t('model.length') }}</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>{{ model.width }} мм</h4>
            <p>{{ t('model.width') }}</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>{{ model.height }} мм</h4>
            <p>{{ t('model.height') }}</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>{{ model.wheelbase }} мм</h4>
            <p>{{ t('model.wheelbase') }}</p>
          </div>
        </div>

        <!-- Оставил id для совместимости с текущим конфигуратором -->
        <NuxtLink :to="`/configurator?id=${model.id}`" class="main-content-models-item-link">
          {{ t('buttons.configurator') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Технические параметры -->
    <div class="model-more-config">
      <div class="model-more-config-item">
        <img :src="Fuel" alt="Запас хода" width="64" height="64" loading="lazy" />
        <h3>
          {{ model.power_reserve }} км
          <span>{{ t('model.power_reserve') }}</span>
        </h3>
      </div>
      <div class="model-more-config-item">
        <img :src="History" alt="Разгон 0–100" width="64" height="64" loading="lazy" />
        <h3>
          {{ model.zero_to_hundred }} сек
          <span>{{ t('model.zero_to_hundred') }}</span>
        </h3>
      </div>
      <div class="model-more-config-item">
        <img :src="Speed" alt="Макс. скорость" width="64" height="64" loading="lazy" />
        <h3>
          {{ model.max_speed }} км/ч
          <span>{{ t('model.max_speed') }}</span>
        </h3>
      </div>
      <div class="model-more-config-item">
        <img :src="Gps" alt="Автопилот" width="64" height="64" loading="lazy" />
        <h3>
          {{ model.autopilot ? t('model.autopilot_on') : t('model.autopilot_off') }}
          <span>{{ model.autopilot_description }}</span>
        </h3>
      </div>
    </div>

    <!-- Цвет кузова -->
    <div class="model-more-color" v-if="model.color?.length">
      <h3>{{ t('model.color_title') }}</h3>

      <img
          :src="activeColorImage"
          :alt="`Цвет ${activeColorName} — ${model.name}`"
          class="car-image"
          loading="lazy"
          width="1280"
          height="720"
      />

      <div class="model-more-color-wrapper">
        <div
            v-for="(color, index) in model.color"
            :key="color.id || index"
            class="model-more-color-wrapper-item"
            :class="{ active: selectedColorIndex === index }"
            @click="setColor(index)"
            role="button"
            :aria-pressed="selectedColorIndex === index"
        >
          <span :style="{ backgroundColor: color.hex_code }" aria-hidden="true"></span>
          <h2>{{ color.name }}</h2>
        </div>
      </div>
    </div>

    <!-- Интерьеры -->
    <div class="model-more-interier" v-if="model.interior_desc?.length">
      <h2>
        {{ model.interior_desc[0].title }}
        <span v-html="model.interior_desc[0].description"></span>
      </h2>
      <div class="model-more-interier-wrapper">
        <div
            class="model-more-interier-item"
            v-for="option in model.interior_desc[0].interior_options"
            :key="option.id"
        >
          <img :src="option.image" :alt="option.title" loading="lazy" width="960" height="540" />
          <h4>{{ option.title }}</h4>
        </div>
      </div>
    </div>

    <!-- Электрическая информация -->
    <div class="model-more-interier" v-if="model.electric_information?.length">
      <h2>
        {{ model.electric_information[0].title }}
        <span>{{ model.electric_information[0].description }}</span>
      </h2>
      <div class="model-more-interier-wrapper">
        <div
            class="model-more-interier-item"
            v-for="item in model.electric_information[0].electric_options"
            :key="item.id"
        >
          <img :src="item.image" :alt="item.title" loading="lazy" width="960" height="540" />
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
        <img
            :src="model.smart_drive_system[0].image"
            alt="Умная система вождения — {{ model.name }}"
            loading="lazy"
            width="1280"
            height="720"
        />
        <div class="smart-driving-boxes">
          <div
              class="smart-driving-box"
              v-for="opt in model.smart_drive_system[0].smart_drive_options"
              :key="opt.id"
          >
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
            type="button"
        >
          {{ opt.title }}
        </button>
      </div>
      <img
          :src="model.driving_assistance[selectedAdasIndex].image"
          alt="Система помощи водителю — {{ model.driving_assistance[selectedAdasIndex].title }}"
          class="adas-image"
          loading="lazy"
          width="1280"
          height="720"
      />
    </div>

    <!-- Безопасность -->
    <div class="safety-section" v-if="model.safety?.length">
      <h2>{{ model.safety[0].title }}</h2>
      <p class="safety-subtitle">{{ model.safety[0].description }}</p>
      <div class="safety-grid">
        <div class="safety-feature" v-for="item in model.safety[0].safety_options" :key="item.id">
          <img :src="item.image" :alt="item.title" loading="lazy" width="720" height="480" />
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
      <div
          class="hybrid-row"
          v-for="(item, index) in model.electro_hybrid[0].electro_hybrid_options"
          :key="item.id"
          :class="{ reverse: index % 2 !== 0 }"
      >
        <div class="hybrid-image">
          <img :src="item.image" :alt="item.title" loading="lazy" width="960" height="540" />
        </div>
        <div class="hybrid-text">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Видео -->
    <div class="video-section" v-if="model.videos?.length">
      <h2>{{ t('model.video') }}</h2>
      <div class="video-grid">
        <div
            class="video-card"
            v-for="(video, index) in model.videos"
            :key="index"
            @click="openVideo(getYoutubeId(video.video_url))"
            role="button"
            :aria-label="`Открыть видео ${index+1}`"
        >
          <img :src="getYoutubeThumbnail(video.video_url)" alt="Видео: {{ model.name }}" loading="lazy" width="480" height="270" />
          <div class="video-overlay">
            <div class="play-button"></div>
          </div>
        </div>
      </div>

      <div v-if="activeVideo" class="video-modal" @click.self="closeVideo">
        <iframe
            :src="`https://www.youtube.com/embed/${activeVideo}?autoplay=1`"
            allowfullscreen
            loading="lazy"
            title="Видео о модели"
        ></iframe>
        <button class="close-btn" @click="closeVideo" type="button" aria-label="Закрыть">×</button>
      </div>
    </div>
  </div>

  <div v-else>{{ t('loading') }}</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAsyncData, useHead } from '#imports'
import { useI18n } from 'vue-i18n'
import Fuel from '@/assets/models/fuel.png'
import Speed from '@/assets/models/speed.png'
import History from '@/assets/models/history.png'
import Gps from '@/assets/models/gps.png'

type AnyRec = Record<string, any>

const route = useRoute()
const { t, locale } = useI18n()

/** Базовые урлы */
const baseUrl = 'https://lixiang-uzbekistan.uz'
const localizedPrefix = computed(() => (locale.value !== 'ru' ? '/' + locale.value : ''))
const canonicalUrl = computed(() => `${baseUrl}${localizedPrefix.value}/model/${route.params.id}`)

/** SSR: грузим модель по id; если API не поддерживает id — делаем graceful fallback */
const { data } = await useAsyncData<AnyRec | null>('model', async () => {
  try {
    // 1) Пытаемся получить по id
    return await $fetch(`${baseUrl.replace('https://lixiang-uzbekistan.uz', 'https://api.lixiang-uzbekistan.uz')}/api/models/${route.params.id}/`, {
      headers: { 'Accept-Language': locale.value }
    })
  } catch {
    // 2) Фоллбек: тянем список и ищем совпадение по id
    try {
      const list: AnyRec[] = await $fetch(`${baseUrl.replace('https://lixiang-uzbekistan.uz', 'https://api.lixiang-uzbekistan.uz')}/api/models/`, {
        headers: { 'Accept-Language': locale.value }
      })
      const found = list.find((m) => (m.id || '').toString() === String(route.params.id))
      return found || null
    } catch {
      return null
    }
  }
}, { server: true })

const model = computed<AnyRec | null>(() => data.value)

/** Цвета / изображения */
const selectedColorIndex = ref(0)
const setColor = (idx: number) => { selectedColorIndex.value = idx }
const activeColorImage = computed(() =>
    model.value?.color?.[selectedColorIndex.value]?.image || model.value?.color?.[0]?.image || ''
)
const activeColorName = computed(() =>
    model.value?.color?.[selectedColorIndex.value]?.name || model.value?.color?.[0]?.name || ''
)

/** ADAS переключатели */
const selectedAdasIndex = ref(0)
const setAdas = (idx: number) => { selectedAdasIndex.value = idx }

/** YouTube helpers */
const getYoutubeId = (url: string): string => {
  const m = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/)
  return m ? m[1] : ''
}
const getYoutubeThumbnail = (url: string): string => {
  const id = getYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '/fallback.png'
}

/** Мета / OG */
useHead(() => {
  const car = model.value
  const title = car ? `${car.name} — ${t('seo.model.title_seo') || 'Электромобиль Lixiang'}` : (t('seo.model.title_fallback') || 'Модель Lixiang')
  const desc = car?.smart_drive_system?.[0]?.description || t('seo.model.description_seo') || 'Официальный дилер YasAuto. Подробности и характеристики модели.'
  const ogImage = activeColorImage.value || `${baseUrl}/logoblack.png`

  return {
    title,
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: 'product' },
      { property: 'og:url', content: canonicalUrl.value },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl.value }
    ]
  }
})

/** hreflang через i18n */
const localeHead = useLocaleHead({ addSeoAttributes: true })
useHead({
  link: [...(localeHead?.value?.link || [])],
  htmlAttrs: localeHead?.value?.htmlAttrs
})

/** JSON-LD Product */
useHead(() => {
  const car = model.value
  if (!car) return {}
  const price = Number(car.price || 0)
  const images = [
    ...(car.color?.map((c: AnyRec) => c.image).filter(Boolean) || []),
    ...(car.smart_drive_system?.[0]?.image ? [car.smart_drive_system[0].image] : [])
  ]

  return {
    script: [{
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: car.name,
        description: car.smart_drive_system?.[0]?.description || 'Электромобиль Lixiang',
        image: images,
        brand: { '@type': 'Brand', name: 'Lixiang' },
        sku: `model-${car.id}`,
        url: canonicalUrl.value,
        offers: {
          '@type': 'Offer',
          price: price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: canonicalUrl.value,
          itemCondition: 'https://schema.org/NewCondition'
        }
      })
    }]
  }
})
</script>

<style scoped>
@import "../model-more.css";

/* Доступный скрытый H1 */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Пример: убедимся, что большие изображения не рвут layout */
.car-image,
.adas-image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
