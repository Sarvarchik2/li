<template>
  <div class="product">
    <nav class="breadcrumbs" aria-label="Хлебные крошки">
      <NuxtLink to="/">{{ $t('main.home') }}</NuxtLink> /
      <NuxtLink to="/market">{{ $t('main.shop') }}</NuxtLink> /
      <span aria-current="page">{{ product?.name || '...' }}</span>
    </nav>

    <div v-if="pending" class="loading">Загрузка…</div>

    <div v-else-if="product" class="product-wrap">
      <section class="product-media">
        <Carousel :items-to-show="1" :wrap-around="false" v-model="currentSlide">
          <Slide v-for="(img, i) in product.images" :key="i">
            <img
                class="carousel-img"
                :src="img.img"
                :alt="`${product.name} — фото ${i+1}`"
                width="960" height="720"
                loading="eager"
            />
          </Slide>
        </Carousel>

        <div class="carousel-scrollbar" aria-hidden="true">
          <div class="scrollbar-fill" :style="{ transform: `translateX(${currentSlide * 100}%)` }" />
        </div>
      </section>

      <aside class="product-info">
        <h1 class="product-title">{{ product?.name || $t('seo.product.fallback_title') }}</h1>

        <p class="product-category" v-if="product.category">
          {{ $t('main.category') }}: {{ product.category }}
        </p>

        <p class="product-description" v-if="product.description">
          {{ product.description }}
        </p>

        <div class="price-line">
          <span class="label">{{ $t('product.price') }}</span>
          <span class="price">{{ formatPrice(product.price) }} $</span>
        </div>

        <div class="quantity">
          <label class="qty-label" :for="`qty-${product.id}`">{{ $t('product.quantity') }}</label>
          <div class="quantity-controls">
            <button type="button" @click="decrement" aria-label="Уменьшить количество">−</button>
            <span class="qty" :id="`qty-${product.id}`">{{ quantity }}</span>
            <button type="button" @click="increment" aria-label="Увеличить количество">+</button>
          </div>
        </div>

        <div class="buttons">
          <NuxtLink
              to="/cart"
              class="btn btn-dark"
              :class="{ 'btn-disabled': quantity === 0 }"
              :aria-disabled="quantity === 0"
              :tabindex="quantity === 0 ? -1 : 0"
          >
            {{ $t('buttons.go') }}
          </NuxtLink>

          <button class="btn btn-outline" type="button" :disabled="quantity === 0" @click="addToCart">
            <span class="icon">
              <img :src="Cart" alt="" width="18" height="18" />
            </span>
            {{ $t('buttons.add_to_cart') }}
          </button>
        </div>
      </aside>
    </div>

    <div v-else class="empty">{{ $t('main.no_products') }}</div>

    <!-- Уведомление -->
    <transition name="fade">
      <div v-if="showNotification" class="notification" role="status" aria-live="polite">
        {{ notificationMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAsyncData, useHead } from '#imports'
import { useI18n } from 'vue-i18n'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import Cart from '@/assets/cart.png'
import { useCartStore } from '@/stores/cart'

interface ProductImage { id?: number; img: string }
interface Product {
  id: number
  slug: string
  name: string
  price: number
  category: string
  images: ProductImage[]
  description?: string
}

const cart = useCartStore()
const route = useRoute()
const { t, locale } = useI18n()

const baseUrl = 'https://lixiang-uzbekistan.uz'
const id = computed(() => String(route.params.id))
const localizedPrefix = computed(() => (locale.value !== 'ru' ? '/' + locale.value : ''))
const productUrl = computed(() => `${baseUrl}${localizedPrefix.value}/product/${id.value}`)

const quantity = ref(1)
const currentSlide = ref(0)
const showNotification = ref(false)
const notificationMessage = ref('')

const increment = () => { quantity.value++ }
const decrement = () => { if (quantity.value > 1) quantity.value-- }

const formatPrice = (val?: number) =>
    `${Number(val || 0).toLocaleString('ru-RU', { minimumFractionDigits: 0 })}`

/** --- SSR: грузим товар по id; ключ завязан на id и язык, чтобы на смене языка был refetch --- */
const { data, pending } = await useAsyncData<Product>(
    () => `product-${id.value}-${locale.value}`, // ✅ уникальный ключ
    () =>
        $fetch(`https://api.lixiang-uzbekistan.uz/api/market-models/${id.value}/`, {
          // если бэкенд ждёт query: ?lang=, можно так:
          // query: { lang: locale.value as string },
          headers: { 'Accept-Language': locale.value }
        }),
    { server: true, watch: [() => locale.value, () => id.value] } // ✅ обновляться при смене языка/ид
)

const product = computed(() => data.value)

/** --- SEO мета / OG / canonical / hreflang --- */
useHead(() => ({
  title: product.value
      ? `${product.value.name} — ${formatPrice(product.value.price)} $ | YasAuto`
      : t('seo.product.fallback_title') || 'Товар | YasAuto',
  meta: [
    { name: 'description', content: product.value?.description || t('seo.product.description') || '' },
    { property: 'og:title', content: product.value ? `${product.value.name} | YasAuto` : 'YasAuto' },
    { property: 'og:description', content: product.value?.description || '' },
    { property: 'og:image', content: product.value?.images?.[0]?.img || `${baseUrl}/logoblack.png` },
    { property: 'og:type', content: 'product' },
    { property: 'og:url', content: productUrl.value },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: productUrl.value }
  ]
}))

const localeHead = useLocaleHead({ addSeoAttributes: true })
useHead({
  link: [...(localeHead?.value?.link || [])],
  htmlAttrs: localeHead?.value?.htmlAttrs
})

/** --- JSON-LD Product --- */
useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.value?.name,
      description: product.value?.description || '',
      image: (product.value?.images || []).map(i => i.img),
      category: product.value?.category,
      brand: { '@type': 'Brand', name: 'YasAuto' },
      sku: product.value ? `prod-${product.value.id}` : undefined,
      url: productUrl.value,
      offers: {
        '@type': 'Offer',
        price: product.value?.price || 0,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: productUrl.value,
        itemCondition: 'https://schema.org/NewCondition'
      }
    })
  }]
})

/** --- Корзина --- */
const addToCart = () => {
  if (!product.value) return
  cart.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images?.[0]?.img || '',
    quantity: quantity.value,
    category: product.value.category
  })

  notificationMessage.value = `✅ ${product.value.name}`
  showNotification.value = true
  setTimeout(() => { showNotification.value = false }, 2500)
}
</script>

<style scoped>
.product { max-width: 1200px; margin: 100px auto 40px; padding: 0 16px; }
.breadcrumbs { margin-bottom: 12px; font-size: 14px; display: none; } /* показывай при желании */
.product-title { font-size: 28px; font-weight: 800; margin: 8px 0 16px; }

.product-wrap { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 32px; }
.product-media { position: relative; background: #fff; border-radius: 16px; padding: 12px; }
.carousel-img { width: 100%; height: auto; display:block; border-radius: 12px; }
.carousel-scrollbar { height: 4px; background: #e0e0e0; border-radius: 20px; position: absolute; left: 12px; right: 12px; bottom: 10px; overflow: hidden; }
.scrollbar-fill { height: 100%; background: #333; width: 100%; transition: transform 0.3s ease; }

.product-info { display: flex; flex-direction: column; gap: 16px; }
.product-category { font-size: 14px; color: #777; }
.product-description { color: #555; line-height: 1.6; }

.price-line { display: flex; justify-content: space-between; align-items: baseline; }
.price-line .label { color: #888; }
.price-line .price { font-size: 24px; font-weight: 800; }

.quantity { margin-top: 8px; display: flex; flex-direction: column; gap: 16px; }
.qty-label { font-weight: 700; }
.quantity-controls { width: max-content; display: inline-flex; align-items: center; border: 1px solid #ccc; border-radius: 999px; padding: 6px 14px; gap: 16px; margin-top: 8px; }
.quantity-controls button { background: none; border: none; font-size: 20px; width: 28px; height: 28px; cursor: pointer; }

.buttons { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
.btn { display:inline-flex; align-items:center; justify-content:center; padding:10px 16px; border-radius: 999px; text-decoration: none; font-weight: 600; }
.btn-dark { background:#111; color:#fff; }
.btn-outline { background:#fff; color:#111; border:1px solid #111; }
.btn-disabled { opacity: .5; pointer-events: none; }

.loading, .empty { text-align: center; font-size: 18px; padding: 30px; color: #777; }

.notification { position: fixed; top: 20px; right: 20px; background: #333; color: #fff; padding: 12px 20px; border-radius: 999px; box-shadow: 0 4px 10px rgba(0,0,0,.15); font-weight: 600; z-index: 9999; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .product-wrap { grid-template-columns: 1fr; }
}
</style>
