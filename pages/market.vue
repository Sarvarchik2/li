<template>
  <div class="market">
    <section class="main-content-market">
      <h1 class="page-title">{{ $t('main.shop') }}</h1>

      <div v-if="pending" class="loading">Загрузка…</div>

      <div v-else-if="products?.length" class="main-content-market-wrapper">
        <article
            v-for="product in products"
            :key="product.id"
            class="main-content-market-item"
        >
          <img
              :src="product.images?.[0]?.img || '/fallback.png'"
              :alt="product.name"
              loading="lazy"
              width="480"
              height="480"
          />
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-category">
            {{ $t('main.category') }}: {{ product.category }}
          </p>
          <p class="product-price">{{ formatPrice(product.price) }} $</p>
          <NuxtLink :to="`/product/${product.id}`" class="product-link">
            {{ $t('main.more') || 'Подробнее' }}
          </NuxtLink>
        </article>
      </div>

      <div v-else class="empty">{{ $t('main.no_products') }}</div>

      <!-- Пагинация (опционально, когда появится серверная) -->
      <!-- <Pagination :page="page" :pages="pages" @change="onPageChange" /> -->
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, useHead } from '#imports'
import { useI18n } from 'vue-i18n'

interface ProductImage { id: number; product: number; img: string }
interface Product {
  id: number
  id: string
  name: string
  price: number
  category: string
  images: ProductImage[]
  description?: string
}

const { t, locale } = useI18n()

/* ---------- SSR: загрузка каталога ---------- */
const { data, pending } = await useAsyncData<Product[]>(
    'market-products',
    () => $fetch('https://api.lixiang-uzbekistan.uz/api/market-models/', {
      headers: { 'Accept-Language': locale.value }
    }),
    { server: true, default: () => [] }
)

const products = computed(() => data.value || [])

/* ---------- Вспомогалки ---------- */
const formatPrice = (v?: number) =>
    `${Number(v || 0).toLocaleString('ru-RU', { minimumFractionDigits: 0 })}`

/* ---------- SEO: мета, OG, каноникал, hreflang ---------- */
const baseUrl = 'https://lixiang-uzbekistan.uz'
const localizedPath = computed(() => `${locale.value !== 'ru' ? '/' + locale.value : ''}/market`)
useHead(() => ({
  title: t('seo.market.title') || 'Магазин Lixiang в Узбекистане — YasAuto',
  meta: [
    { name: 'description', content: t('seo.market.description') || '' },
    { property: 'og:title', content: t('seo.market.og_title') || (t('main.shop') as string) },
    { property: 'og:description', content: t('seo.market.og_description') || '' },
    { property: 'og:image', content: `${baseUrl}/logoblack.png` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${baseUrl}${localizedPath.value}` },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: `${baseUrl}${localizedPath.value}` }
  ]
}))

/* hreflang (если стоит @nuxtjs/i18n) */
const localeHead = useLocaleHead?.({ addSeoAttributes: true })
useHead({
  link: [...(localeHead?.value?.link || [])],
  htmlAttrs: localeHead?.value?.htmlAttrs
})

/* ---------- JSON-LD: WebPage + ItemList ---------- */
useHead(() => {
  // список URL-ов товаров на странице
  const itemUrls = (products.value || []).map(p =>
      `${baseUrl}${locale.value !== 'ru' ? '/' + locale.value : ''}/product/${p.id}`
  )

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: itemUrls.map((url, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url
    }))
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.market.title') || 'Магазин YasAuto',
    description: t('seo.market.description') || '',
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

<style scoped>
.page-title { font-size: 28px; font-weight: 800; margin: 100px 0 16px; text-align: center; }

.loading, .empty {
  text-align: center;
  font-size: 18px;
  padding: 30px;
  color: #777;
}

.main-content-market-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.main-content-market-item {
  width: calc(33.333% - 20px);
  border: 1px solid #e0e0e0;
  text-align: center;
  border-radius: 34px;
  background-color: #fff;
  padding: 16px;
}

.product-name { font-size: 18px; margin: 8px 0 4px; font-weight: 700; }
.product-category { font-size: 14px; color: #777; margin: 0 0 6px; }
.product-price { font-weight: 800; margin: 6px 0 12px; }
@media (max-width: 1024px) {
  .main-content-market-item { width: calc(50% - 20px); }
}
@media (max-width: 580px) {
  .main-content-market-item { width: 100%; }
}
</style>
