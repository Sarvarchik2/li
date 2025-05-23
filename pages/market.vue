
<template>
  <div class="market">
    <div class="main-content-market">
      <h3>{{ $t('main.shop') }}</h3>

      <div v-if="loading" class="loading">Загрузка...</div>
      <div v-else-if="products.length" class="main-content-market-wrapper">
        <div
            v-for="product in products"
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
          <NuxtLink :to="`/productmore?id=${product.id}`">{{ $t('main.more') }}</NuxtLink>
        </div>
      </div>

      <div v-else class="empty">{{ $t('main.no_products') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {useI18n} from "vue-i18n";

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

const products = ref<Product[]>([])
const loading = ref(true)

const formatPrice = (value: number) => {
  return value.toLocaleString('ru-RU', { minimumFractionDigits: 0 })
}

const { t, locale } = useI18n()

useHead(() => ({
  title: t('seo.market.title') || 'Магазин Lixiang в Узбекистане — YasAuto',
  meta: [
    { name: 'description', content: t('seo.market.description') },
    { name: 'keywords', content: t('seo.market.keywords') },
    { property: 'og:title', content: t('seo.market.og_title') },
    { property: 'og:description', content: t('seo.market.og_description') },
    { property: 'og:image', content: 'https://lixiang-uzbekistan.uz/logoblack.png' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://lixiang-uzbekistan.uz${locale.value !== 'ru' ? '/' + locale.value : ''}/market`
    }
  ]
}))


onMounted(async () => {
  try {
    const response = await axios.get('https://api.lixiang-uzbekistan.uz/api/market-models/', {
      headers: {
        'Accept-Language': locale.value
      }
    })
    products.value = response.data
    useHead(() => {
      if (!products.value.length) return {}

      const productSchemas = products.value.map(product => ({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.images?.[0]?.img || "https://lixiang-uzbekistan.uz/fallback.png",
        "description": `${product.name} - ${product.category}`,
        "sku": `prod-${product.id}`,
        "brand": {
          "@type": "Brand",
          "name": "Lixiang"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://lixiang-uzbekistan.uz${locale.value !== 'ru' ? '/' + locale.value : ''}/productmore?id=${product.id}`,
          "priceCurrency": "USD",
          "price": product.price,
          "availability": "https://schema.org/InStock"
        }
      }))

      return {
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify(productSchemas)
          }
        ]
      }
    })

  } catch (e) {
    console.error('Ошибка загрузки товаров:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.loading,
.empty {
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
}
@media (max-width: 769px) {
  .main-content-market-item{
    width: calc(50% - 10px);

  }

}
@media (max-width: 580px) {
  .main-content-market-item{
    width: 100%;

  }

}
</style>
