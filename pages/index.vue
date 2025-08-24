<template>
  <div class="main">
    <header class="main-header">
      <img :src="Header" alt="YasAuto — официальный дилер Lixiang в Узбекистане" width="1600" height="620" />
      <img class="main-header-img1" :src="LiText" alt="Слоган Lixiang Uzbekistan" width="1200" height="200" />
    </header>

    <main class="main-content">
      <!-- Основной SEO-заголовок страницы -->
      <h1 class="sr-only">Lixiang в Узбекистане — модели, цены, официальный дилер YasAuto</h1>

      <h2>{{ $t('main.models') }}</h2>
      <div class="main-content-models">
        <NuxtLink
            v-for="car in models"
            :key="car.id"
            :to="`/model/${car.id}`"
            class="main-content-models-item"
        >
          <img
              :src="car.preview_image"
              :alt="car.name"
              loading="lazy"
              width="640"
              height="360"
          />
          <div class="main-content-models-item-text">
            <h3>
              {{ car.name }}
              <span>{{ formatPrice(car.price) }} {{ $t('main.from') }}</span>
            </h3>
          </div>
        </NuxtLink>
      </div>

      <div v-if="modelL9" class="main-content-models-bottom">
        <div class="main-content-models-bottom-left">
          <h3>{{ modelL9.name }}</h3>
          <p>{{ modelL9.description || $t('main.lorem_text') }}</p>
          <NuxtLink :to="`/model/${modelL9.id}`">{{ $t('main.learn_more') }}</NuxtLink>
        </div>

        <div class="main-content-models-bottom-right">
          <img
              :src="modelL9.preview_image"
              :alt="modelL9.name"
              loading="lazy"
              width="960"
              height="540"
          />
          <h3>
            {{ modelL9.name }}
            <span>{{ formatPrice(modelL9.price) }} {{ $t('main.from') }}</span>
          </h3>
          <div class="main-content-models-bottom-right-text">
            <NuxtLink :to="`/model/${modelL9.id}`">{{ $t('main.build_l9') }}</NuxtLink>
            <NuxtLink :to="`/model/${modelL9.id}`">{{ $t('main.all_l9') }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="main-content-model">
        <h3>
          {{ $t('main.one_click') }}
          <span>{{ $t('main.create_ideal') }}</span>
        </h3>
        <img :src="Li9" alt="Lixiang L9 — габариты и конфигуратор" loading="lazy" width="1280" height="720" />
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

        <div v-if="productsPending" class="loading">Загрузка...</div>

        <div v-else-if="products?.length" class="main-content-market-wrapper">
          <div
              v-for="product in products.slice(0, 6)"
              :key="product.id"
              class="main-content-market-item"
          >
            <img
                :src="product.images.length ? product.images[0].img : '/fallback.png'"
                :alt="product.name"
                loading="lazy"
                width="480"
                height="480"
            />
            <h4>{{ product.name }}</h4>
            <p>{{ $t('main.category') }}: {{ product.category }}</p>
            <h5>{{ formatPrice(product.price) }} $</h5>
            <NuxtLink :to="`/product/${product.id}`">
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
            <button type="button" aria-label="Филиал Ташкент">Ташкент</button>
            <h4>{{ $t('main.address') }}</h4>
            <p>Малая кольцевая дорога 4/1 блок 4</p>

            <div class="main-content-contact-left-info">
              <div class="main-content-contact-left-info-item">
                <h4>{{ $t('main.phone') }}</h4>
                <NuxtLink to="tel:+998773439999" aria-label="Позвонить +998 77 343 99 99">
                  +998 (77) 343 99 99
                </NuxtLink>
                <NuxtLink to="tel:+998200090555" aria-label="Позвонить +998 20 009 05 55">
                  +998 (20) 009 05 55
                </NuxtLink>
              </div>
              <div class="main-content-contact-left-info-item">
                <h4>{{ $t('main.worktime') }}</h4>
                <span>{{ $t('main.weekdays') }}</span>
              </div>
            </div>
          </div>
          <div class="main-content-contact-right">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.135533100059!2d69.31460419999999!3d41.3276661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5bd2c77a2f9%3A0x9328b277ea123405!2zNC8xINCx0LvQvtC6IDQ!5e0!3m2!1sru!2s!4v1747893666524!5m2!1sru!2s"
                style="border:0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Офис YasAuto на карте"
            ></iframe>
          </div>
        </div>
        <NuxtLink to="/contact" class="main-content-models-item-link">
          {{ $t('main.leave_request') }}
        </NuxtLink>
      </div>

      <div class="main-content-about" id="about-us">
        <h3>{{ $t('main.about') }}</h3>

        <div class="main-content-about-wrapper">
          <img :src="Video" alt="Видео-превью о YasAuto" loading="lazy" width="1280" height="720" />
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
          <img :src="Video2" alt="Видео-превью: технологии и сервис" loading="lazy" width="1280" height="720" />
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

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAsyncData, useHead } from '#imports'

interface ProductImage { id: number; product: number; img: string }
interface Product { id: number;  slug: string;    name: string; price: number; category: string; images: ProductImage[] }
interface CarModel {
  id: number
  name: string
  price: number
  preview_image: string
  slug: string          // ✅ добавили slug
  description?: string
}

const { t, locale } = useI18n()

/* --- SSR-загрузка данных (вместо onMounted) --- */
const { data: productsData, pending: productsPending } = await useAsyncData<Product[]>(
    'products',
    () => $fetch('https://api.lixiang-uzbekistan.uz/api/market-models/', {
      headers: { 'Accept-Language': locale.value }
    }),
    { server: true, default: () => [] }
)

const { data: modelsAll } = await useAsyncData<CarModel[]>(
    'models',
    () => $fetch('https://api.lixiang-uzbekistan.uz/api/models/', {
      headers: { 'Accept-Language': locale.value }
    }),
    { server: true, default: () => [] }
)

const products = computed(() => productsData.value || [])
const models = computed(() => (modelsAll.value || []).slice(0, 3))
const modelL9 = computed<CarModel | null>(() => {
  const arr = modelsAll.value || []
  return arr.find((m) => m?.name?.toLowerCase().includes('l9')) || null
})

/* --- Утилиты --- */
const formatPrice = (val: number) => `${Number(val || 0).toLocaleString('ru-RU', { minimumFractionDigits: 0 })}`

/* --- SEO: hreflang, canonical и OG --- */
const baseUrl = 'https://lixiang-uzbekistan.uz'
const localizedPath = computed(() => `${locale.value !== 'ru' ? '/' + locale.value : ''}/`)

/* i18n SEO-хелпер (из @nuxtjs/i18n) */
const localeHead = useLocaleHead({ addSeoAttributes: true })

useHead(() => ({
  title: t('seo.home.title'),
  meta: [
    { name: 'description', content: t('seo.home.description') },
    // Open Graph
    { property: 'og:title', content: t('seo.home.og_title') },
    { property: 'og:description', content: t('seo.home.og_description') },
    { property: 'og:image', content: `${baseUrl}/logoblack.png` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${baseUrl}${localizedPath.value}` },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    ...(localeHead?.value?.link || []),
    { rel: 'canonical', href: `${baseUrl}${localizedPath.value}` },
    { rel: 'preload', as: 'image', href: Header }
  ],
  htmlAttrs: localeHead?.value?.htmlAttrs
}))

/* --- JSON-LD: Organization + AutoDealer + WebSite(SearchAction) --- */
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "YasAuto",
        "url": baseUrl,
        "logo": `${baseUrl}/logoblack.png`,
        "description": "Официальный дилер Lixiang в Узбекистане. Продажа Li9, Li7, Li6, запчасти и обслуживание.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Малая кольцевая дорога 4/1 блок 4",
          "addressLocality": "Ташкент",
          "addressCountry": "UZ"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+998773439999",
          "contactType": "customer service",
          "areaServed": "UZ"
        },
        "sameAs": [
          "https://www.instagram.com/_yas_auto_/",
          "https://t.me/yas_auto"
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AutoDealer",
        "name": "YasAuto — Lixiang Uzbekistan",
        "image": `${baseUrl}/logoblack.png`,
        "url": baseUrl,
        "telephone": "+998773439999",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Малая кольцевая дорога 4/1 блок 4",
          "addressLocality": "Ташкент",
          "addressCountry": "UZ"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 41.3276661, "longitude": 69.3146042 },
        "openingHoursSpecification": [{
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "09:00",
          "closes": "20:00"
        }]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": baseUrl,
        "name": "YasAuto",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      })
    }
  ]
})
</script>

<style>
@import './index.css';

/* Визуально скрытый, но доступный для скринридеров H1 */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
