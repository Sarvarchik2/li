<template>
  <div class="car-more" :key="pageKey">
    <div v-if="pending" key="state-pending" class="loading">Загрузка…</div>

    <section v-else-if="car" key="state-loaded">
      <!-- Галерея -->
      <div
          class="carousel-wrapper"
          v-if="car.images.length"
          :key="`gallery-${car.id}-${locale}`"
      >
        <Carousel
            v-model="currentSlide"
            :items-to-show="1"
            :wrap-around="true"
            :mouse-drag="true"
            class="carousel"
        >
          <Slide v-for="(img, i) in car.images" :key="i">
            <img
                :src="img.image"
                class="main-image"
                :alt="`${car.car_name} ${car.year_production} — фото ${i + 1}`"
                width="1280"
                height="720"
                loading="eager"
                @click="openZoom(img.image)"
            />
          </Slide>
        </Carousel>

        <div class="carousel-scrollbar" aria-hidden="true">
          <div
              class="scrollbar-fill"
              :style="{
              width: (100 / car.images.length) + '%',
              transform: `translateX(${(currentSlide % car.images.length) * 100}%)`
            }"
          />
        </div>
      </div>

      <div class="carousel-wrapper" v-else>
        <img :src="defaultImage" class="main-image" alt="YasAuto — автомобиль в наличии" width="1280" height="720" />
      </div>

      <!-- Хлебные крошки -->
      <nav class="breadcrumbs" aria-label="Хлебные крошки">
        <NuxtLink to="/">{{ $t('main.home') }}</NuxtLink> /
        <NuxtLink to="/carsinstock">{{ $t('stock.title') }}</NuxtLink> /
        <span aria-current="page">{{ car.car_name }} {{ car.year_production }}</span>
      </nav>

      <!-- Заголовок / Цена -->
      <div class="header">
        <h1>{{ car.car_name }} {{ car.year_production }}</h1>
        <div class="price-order">
          <p class="price">{{ formatPrice(car.price) }}$</p>
          <NuxtLink class="order-button" to="/contact">{{ $t('car.request') }}</NuxtLink>
        </div>
      </div>

      <!-- Характеристики -->
      <div class="info-grid">
        <div class="column">
          <p><b>{{ $t('car.status') }}:</b> <span>{{ car.status ? $t('car.available') : $t('car.on_order') }}</span></p>
          <p><b>{{ $t('car.year') }}:</b> <span>{{ formatNumber(car.year_production) }}</span></p>
          <p><b>{{ $t('car.mileage') }}:</b> <span>{{ formatNumber(car.mileage) }} км</span></p>
          <p><b>{{ $t('car.body') }}:</b> <span>{{ car.body_type }}</span></p>
          <p><b>{{ $t('car.configuration') }}:</b> <span>{{ car.configuration }}</span></p>
          <p><b>{{ $t('car.engine') }}:</b> <span>{{ car.engine }}</span></p>
          <p><b>{{ $t('car.exterior') }}:</b> <span>{{ car.exterior }}</span></p>
        </div>

        <div class="column">
          <p><b>{{ $t('car.acceleration') }}:</b> <span>{{ formatNumber(car.zero_to_hundred) }} сек</span></p>
          <p><b>{{ $t('car.max_speed') }}:</b> <span>{{ formatNumber(car.max_speed) }} км/ч</span></p>
          <p><b>{{ $t('car.range') }}:</b> <span>{{ formatNumber(car.range) }} км</span></p>
          <p><b>{{ $t('car.drive') }}:</b> <span>{{ car.drive_type }}</span></p>
          <p><b>{{ $t('car.transmission') }}:</b> <span>{{ car.transmission }}</span></p>
          <p><b>{{ $t('car.interior') }}:</b> <span>{{ car.interior }}</span></p>
        </div>

        <div class="description">
          <h2>{{ $t('car.description_title') }}</h2>
          <p>{{ car.description }}</p>

          <h2 v-if="equipmentList.length">{{ $t('car.equipment_title') }}</h2>
          <ul v-if="equipmentList.length">
            <li v-for="(item, index) in equipmentList" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>

      <!-- Зум -->
      <div class="zoom-modal" v-if="zoomImage" @click.self="closeZoom">
        <img :src="zoomImage" class="zoom-img" alt="Просмотр изображения" />
      </div>
    </section>

    <div v-else key="state-empty" class="not-found">
      <h2>{{ $t('car.not_found') || 'Автомобиль не найден' }}</h2>
      <NuxtLink to="/carsinstock">← {{ $t('car.back_to_list') || 'Назад к списку' }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useAsyncData, useHead } from '#imports'
import { useI18n } from 'vue-i18n'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import defaultImage from '@/assets/li9.png'

interface CarImage { id?: number; image: string }
interface AvailableCar {
  id: number | string
  car_name: string
  price: number | string
  description: string
  year_production: number | string
  images: CarImage[] | null
  status?: boolean
  mileage?: number | string
  body_type?: string
  configuration?: string
  engine?: string
  exterior?: string
  zero_to_hundred?: number | string
  max_speed?: number | string
  range?: number | string
  drive_type?: string
  transmission?: string
  interior?: string
  equipment?: string
}

const route = useRoute()
const { t, locale } = useI18n()

const id = computed(() => String(route.params.id || ''))
const pageKey = computed(() => `${id.value}-${locale.value}`)

const currentSlide = ref(0)
const zoomImage = ref<string | null>(null)
const equipmentList = ref<string[]>([])

/* --- загрузка детальной записи, с защитой на случай массива --- */
const { data, pending } = await useAsyncData<AvailableCar | null>(
    () => `available-car-${id.value}-${locale.value}`,
    async () => {
      if (!id.value) return null

      const res = await $fetch<any>(`https://api.lixiang-uzbekistan.uz/api/available-cars/${id.value}/`, {
        headers: { 'Accept-Language': locale.value }
      })

      // если вдруг API вернул массив — найдём нужный элемент
      const obj: any = Array.isArray(res)
          ? (res.find((x: any) => String(x?.id) === id.value) || res[0] || null)
          : res

      if (!obj) return null

      return {
        ...obj,
        images: Array.isArray(obj.images) ? obj.images : []
      } as AvailableCar
    },
    { server: true, watch: [() => locale.value, () => id.value] }
)

const car = computed(() => data.value || null)

/* --- утилиты чисел --- */
const toNumber = (val: unknown): number | null => {
  if (val == null) return null
  if (typeof val === 'number' && isFinite(val)) return val
  if (typeof val === 'string') {
    const cleaned = val.replace(/\u00A0|\s/g, '').replace(/,/g, '.')
    const n = Number(cleaned)
    return isFinite(n) ? n : null
  }
  return null
}
const formatNumber = (v: unknown) => {
  const n = toNumber(v)
  return n == null ? '—' : n.toLocaleString('ru-RU', { maximumFractionDigits: 2 })
}
const formatPrice = (v: unknown) => {
  const n = toNumber(v)
  return n == null ? '0' : n.toLocaleString('ru-RU', { minimumFractionDigits: 0 })
}

/* --- зум --- */
const openZoom = (img: string) => (zoomImage.value = img)
const closeZoom = () => (zoomImage.value = null)

/* --- деривации для SEO --- */
const baseUrl = 'https://lixiang-uzbekistan.uz'
const localizedPrefix = computed(() => (locale.value !== 'ru' ? '/' + locale.value : ''))
const pageUrl = computed(() => `${baseUrl}${localizedPrefix.value}/carinstockmore/${id.value}`)

/* --- equipmentList из данных --- */
watchEffect(() => {
  const eq = car.value?.equipment || ''
  equipmentList.value = eq
      .split('\n')
      .map(s => s.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean)
})

/* --- SEO --- */
useHead(() => {
  const c = car.value
  const title = c
      ? `${t('seo.car.page_title')} ${c.car_name} ${c.year_production} — ${t('seo.car.page_title2') || 'Авто в наличии | YasAuto'}`
      : (t('seo.car.page_fallback') as string) || 'Авто в наличии | YasAuto'

  const desc = c?.description || (t('seo.car.page_description') as string) || 'Автомобиль Lixiang в наличии в Узбекистане. Характеристики, цена, комплектация.'
  const ogImage = (c?.images?.[0]?.image) || `${baseUrl}/default-car.png`

  return {
    title,
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: 'product' },
      { property: 'og:url', content: pageUrl.value },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [{ rel: 'canonical', href: pageUrl.value }]
  }
})

const localeHead = useLocaleHead?.({ addSeoAttributes: true })
useHead({
  link: [...(localeHead?.value?.link || [])],
  htmlAttrs: localeHead?.value?.htmlAttrs
})

/* --- JSON-LD --- */
useHead(() => {
  if (!car.value) return {}

  const c = car.value
  const availability = c.status ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder'

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${c.car_name} ${c.year_production}`,
    description: c.description || 'Автомобиль в наличии',
    image: (c.images || []).map(i => i.image),
    brand: { '@type': 'Brand', name: 'Lixiang' },
    sku: `stock-${c.id}-${c.year_production}`,
    url: pageUrl.value,
    offers: {
      '@type': 'Offer',
      price: toNumber(c.price) || 0,
      priceCurrency: 'USD',
      availability,
      url: pageUrl.value,
      itemCondition: 'https://schema.org/UsedCondition'
    }
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${baseUrl}${localizedPrefix.value}/` },
      { '@type': 'ListItem', position: 2, name: (t('stock.title') as string) || 'Авто в наличии', item: `${baseUrl}${localizedPrefix.value}/carsinstock` },
      { '@type': 'ListItem', position: 3, name: `${c.car_name} ${c.year_production}`, item: pageUrl.value }
    ]
  }

  return {
    script: [
      { type: 'application/ld+json', children: JSON.stringify(productLd) },
      { type: 'application/ld+json', children: JSON.stringify(breadcrumbLd) }
    ]
  }
})
</script>

<style scoped>
.loading,
.not-found { text-align: center; font-size: 20px; padding: 50px; color: #777; }

.car-more { font-family: Arial, sans-serif; margin-top: 50px; }

/* КАРУСЕЛЬ */
.carousel-wrapper { position: relative; margin-bottom: 20px; border-radius: 20px; overflow: hidden; }
.carousel { border-radius: 20px; }
.main-image { width: 100%; height: 500px; object-fit: cover; cursor: zoom-in; }
.carousel-scrollbar { height: 4px; background-color: #e0e0e0; overflow: hidden; position: relative; border-radius: 3px; }
.scrollbar-fill { height: 100%; background-color: #333; transition: transform 0.3s ease; }

/* ХЕДЕР */
.breadcrumbs { margin: 12px 0; font-size: 14px; }
.header { display: flex; justify-content: space-between; flex-wrap: wrap; align-items: center; margin-bottom: 20px; }
.price-order { display: flex; align-items: center; gap: 20px; }
.price { font-size: 24px; font-weight: bold; }
.order-button { background: #BFBFBF; color: white; border: none; text-decoration: none; padding: 10px 20px; cursor: pointer; border-radius: 20px; }

/* СЕТКА */
.info-grid { display: flex; flex-wrap: wrap; gap: 30px; }
.column { flex: 1 1 220px; display: flex; flex-direction: column; gap: 10px; font-size: 15px; }
.column p { display: flex; flex-direction: column; font-size: 16px; color: #999; gap: 6px; }
.column p b { color: #000; font-size: 18px; }
.column p span { color: #555; }
.description { flex: 2 1 400px; }
.description p { color: #777; }
.description ul { display: flex; flex-direction: column; gap: 10px; padding-left: 20px; list-style-type: disc; }
.description ul li { color: #777; }
.description h2 { font-size: 20px; margin-top: 10px; }

/* ЗУМ */
.zoom-modal { position: fixed; inset: 0; background: rgba(0,0,0,.95); display: flex; justify-content: center; align-items: center; z-index: 999; cursor: zoom-out; }
.zoom-img { max-width: 90%; max-height: 90%; object-fit: contain; }

/* АДАПТИВ */
@media (max-width: 768px) {
  .main-image { height: 260px; }
  .header { flex-direction: column; align-items: flex-start; gap: 10px; }
  .info-grid { flex-direction: column; }
  .description { order: -1; }
}
</style>
