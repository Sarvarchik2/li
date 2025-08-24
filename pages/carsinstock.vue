<template>
  <div class="stock">
    <h1>{{ $t('stock.title') }}</h1>

    <div v-if="pending" class="loading">Загрузка…</div>

    <div v-else-if="cars.length" class="stock-wrapper">
      <article v-for="car in cars" :key="car.id" class="stock-item">
        <img
            :src="car.preview_image || car.images?.[0]?.image || '/fallback.png'"
            :alt="`${car.car_name} ${car.year_production}`"
            loading="lazy"
            width="640"
            height="360"
        />
        <div class="stock-item-text">
          <h3>{{ car.car_name }} {{ car.year_production }}</h3>
          <p>{{ shortenText(car.description, 200) }}</p>
          <h4>
            {{ formatPrice(car.price) }}$
            <NuxtLink :to="`/carinstockmore/${car.id}`">
              {{ $t('stock.more') }}
            </NuxtLink>
          </h4>
        </div>
      </article>
    </div>

    <div v-else class="no-cars">
      {{ $t('stock.empty') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, useHead } from '#imports'
import { useI18n } from 'vue-i18n'

interface CarImage { id: number; image: string }
interface AvailableCar {
  id: number
  car_name: string
  price: number
  description: string
  year_production: number
  images: CarImage[]
  preview_image?: string
  slug?: string
}

const { t, locale } = useI18n()

/* SSR загрузка, ключ зависит от языка */
const { data, pending } = await useAsyncData<AvailableCar[]>(
    () => `available-cars-${locale.value}`,
    () => $fetch('https://api.lixiang-uzbekistan.uz/api/available-cars/', {
      headers: { 'Accept-Language': locale.value }
    }),
    { server: true, default: () => [], watch: [() => locale.value] }
)

const cars = computed(() => data.value || [])

/* Утилиты */
const shortenText = (text?: string, limit = 200) =>
    !text ? '' : (text.length > limit ? text.slice(0, limit) + '…' : text)

const formatPrice = (v?: number) =>
    `${Number(v || 0).toLocaleString('ru-RU', { minimumFractionDigits: 0 })}`

/* SEO: мета/OG/canonical */
const baseUrl = 'https://lixiang-uzbekistan.uz'
const localizedPath = computed(() =>
    `${locale.value !== 'ru' ? '/' + locale.value : ''}/carsinstock`
)

useHead(() => ({
  title: (t('seo.stock.title') as string) || 'Авто в наличии — YasAuto',
  meta: [
    { name: 'description', content: (t('seo.stock.description') as string) || '' },
    { property: 'og:title', content: (t('seo.stock.og_title') as string) || (t('stock.title') as string) },
    { property: 'og:description', content: (t('seo.stock.og_description') as string) || '' },
    { property: 'og:image', content: `${baseUrl}/logoblack.jpg` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${baseUrl}${localizedPath.value}` },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: `${baseUrl}${localizedPath.value}` }
  ]
}))

/* hreflang (если есть @nuxtjs/i18n) */
const localeHead = useLocaleHead?.({ addSeoAttributes: true })
useHead({
  link: [...(localeHead?.value?.link || [])],
  htmlAttrs: localeHead?.value?.htmlAttrs
})

/* JSON-LD: WebPage + ItemList */
useHead(() => {
  const urls = (cars.value || []).map(car =>
      `${baseUrl}${locale.value !== 'ru' ? '/' + locale.value : ''}/carinstockmore/${car.id}`
  )

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: (t('seo.stock.title') as string) || 'Авто в наличии — YasAuto',
    description: (t('seo.stock.description') as string) || '',
    url: `${baseUrl}${localizedPath.value}`
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: urls.map((url, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url
    }))
  }

  return {
    script: [
      { type: 'application/ld+json', children: JSON.stringify(webPage) },
      { type: 'application/ld+json', children: JSON.stringify(itemList) }
    ]
  }
})
</script>

<style scoped>
@import "./carsinstock.css";

.loading,
.no-cars {
  text-align: center;
  font-size: 18px;
  color: #777;
  padding: 40px;
}
</style>
