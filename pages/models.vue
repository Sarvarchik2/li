<template>
  <div class="models">
    <!-- H1 для SEO (можно сделать видимым, если хочешь) -->
    <h1 class="sr-only">{{ $t('seo.models.title') }}</h1>

    <h2>{{ $t('main.models') }}</h2>

    <div class="main-content-models" v-if="!pending && modelsList.length">
      <NuxtLink
          v-for="m in modelsList"
          :key="m.id"
          :to="`/model/${m.id}`"
          class="main-content-models-item"
      >
        <img
            :src="m.preview_image"
            :alt="m.name || 'Model'"
            loading="lazy"
            width="640"
            height="360"
        />
        <div class="main-content-models-item-text">
          <h3>
            {{ m.name || 'Li' }}
            <span>{{ $t('main.from') }} {{ formatPrice(m.price) }} $</span>
          </h3>
        </div>
      </NuxtLink>
    </div>

    <div v-else-if="pending" class="loading">Загрузка…</div>
    <div v-else class="empty">{{ $t('main.no_products') }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, useHead } from '#imports'
import { useI18n } from 'vue-i18n'

interface CarModel {
  id: number
  name: string
  price: number
  preview_image: string
  is_available?: boolean
  slug?: string
}

const { t, locale } = useI18n()

/* ---------- SSR-загрузка, привязка к языку ---------- */
const { data, pending } = await useAsyncData<CarModel[]>(
    () => `models-${locale.value}`,
    () =>
        $fetch('https://api.lixiang-uzbekistan.uz/api/models/', {
          headers: { 'Accept-Language': locale.value }
        }),
    { server: true, default: () => [], watch: [() => locale.value] }
)

const all = computed(() => data.value || [])
const modelsList = computed(() => all.value.filter(m => m.is_available !== false))

/* ---------- Линки: slug → /model/<slug>, иначе фолбэк ---------- */
const modelLink = (m: CarModel) =>
    m.slug
        ? `/model/${m.slug}`
        : { path: '/model-more', query: { id: m.id } } // оставил как безопасный фолбэк, если детали ещё на id

/* ---------- Утилиты ---------- */
const formatPrice = (v?: number) =>
    `${Number(v || 0).toLocaleString('ru-RU', { minimumFractionDigits: 0 })}`

/* ---------- SEO: мета, OG, каноникал ---------- */
const baseUrl = 'https://lixiang-uzbekistan.uz'
const localizedPath = computed(() => `${locale.value !== 'ru' ? '/' + locale.value : ''}/models`)
useHead(() => ({
  title: (t('seo.models.title') as string) || 'Модели Lixiang — YasAuto',
  meta: [
    { name: 'description', content: (t('seo.models.description') as string) || '' },
    { property: 'og:title', content: (t('seo.models.og_title') as string) || (t('main.models') as string) },
    { property: 'og:description', content: (t('seo.models.og_description') as string) || '' },
    { property: 'og:image', content: `${baseUrl}/logoblack.png` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${baseUrl}${localizedPath.value}` },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: `${baseUrl}${localizedPath.value}` }
  ]
}))

/* ---------- hreflang (если стоит @nuxtjs/i18n) ---------- */
const localeHead = useLocaleHead?.({ addSeoAttributes: true })
useHead({
  link: [...(localeHead?.value?.link || [])],
  htmlAttrs: localeHead?.value?.htmlAttrs
})

/* ---------- JSON-LD: WebPage + ItemList ---------- */
useHead(() => {
  const urls = modelsList.value.map(m =>
      `${baseUrl}${locale.value !== 'ru' ? '/' + locale.value : ''}${
          m.slug ? `/model/${m.slug}` : `/model-more?id=${m.id}`
      }`
  )

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: urls.map((url, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url
    }))
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: (t('seo.models.title') as string) || 'Модели Lixiang',
    description: (t('seo.models.description') as string) || '',
    url: `${baseUrl}${localizedPath.value}`
  }

  return {
    script: [
      { type: 'application/ld+json', children: JSON.stringify(webPage) },
      { type: 'application/ld+json', children: JSON.stringify(itemList) }
    ]
  }
})
</script>

<style>
@import './models.css';

/* Визуально скрытый, но доступный H1 */
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

/* вспомогательные стили состояния */
.loading,
.empty {
  text-align: center;
  font-size: 18px;
  padding: 30px;
  color: #777;
}
</style>
