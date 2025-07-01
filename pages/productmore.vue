<template>
  <div class="product-page">
    <div v-if="loading" class="loading">Загрузка...</div>

    <div v-else-if="product" class="product-card">
      <div class="carousel-wrapper">
        <Carousel :items-to-show="1" :wrap-around="false" v-model="currentSlide">
          <Slide v-for="(img, i) in product.images" :key="i">
            <img :src="img.img" class="carousel-img" />
          </Slide>
        </Carousel>

        <div class="carousel-scrollbar">
          <div class="scrollbar-fill" :style="{ width: '100%', transform: `translateX(${currentSlide * 100}%)` }" />
        </div>
      </div>

      <div class="info-wrapper">
        <h2 class="name">{{ product.name }}</h2>
        <p class="description">{{ formatPrice(product.description) }}</p>

        <div class="price-line">
          <span class="label">{{ $t('product.price') }}</span>
          <span class="price">{{ formatPrice(product.price) }} $</span>
        </div>

        <div class="quantity">
          <label>{{ $t('product.quantity') }}</label>
          <div class="quantity-controls">
            <button @click="decrement">−</button>
            <span>{{ quantity }}</span>
            <button @click="increment">+</button>
          </div>
        </div>

        <div class="buttons">
          <NuxtLink to="/cart" class="add-btn" :disabled="quantity === 0">{{ $t('buttons.go') }}</NuxtLink>
          <button :disabled="quantity === 0" @click="addToCart" class="go-btn">
            <span class="icon"><img :src="Cart" alt="cart" /></span> {{ $t('buttons.add_to_cart') }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="loading">Товар не найден</div>

    <!-- Кастомное уведомление -->
    <transition name="fade">
      <div v-if="showNotification" class="notification">{{ notificationMessage }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import Cart from '@/assets/cart.png'
import { useCartStore } from '@/stores/cart'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const route = useRoute()
const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const currentSlide = ref(0)
const showNotification = ref(false)
const notificationMessage = ref('')
const cart = useCartStore()

const increment = () => quantity.value++
const decrement = () => {
  if (quantity.value > 1) quantity.value--
}


const formatPrice = (val: number) => {
  return val.toLocaleString('ru-RU', { minimumFractionDigits: 0 })
}

onMounted(async () => {
  const id = route.query.id
  if (!id) return

  try {
    const response = await axios.get('https://api.lixiang-uzbekistan.uz/api/market-models/', {
      headers: {
        'Accept-Language': locale.value
      }
    })

    const found = response.data.find((item: any) => item.id === Number(id))
    if (found) {
      product.value = found

      // ✅ SEO: вызываем useHead после получения данных
      useHead({
        title: `${found.name} — ${t('product.title') || 'Lixiang аксессуар'}`,
        meta: [
          {
            name: 'description',
            content: found.description || t('product.default_description') || 'Оригинальные аксессуары и запчасти для автомобилей Lixiang.'
          },
          {
            property: 'og:title',
            content: `${found.name} — ${t('product.title') || 'Lixiang аксессуар'}`
          },
          {
            property: 'og:description',
            content: found.description || t('product.default_description') || 'Оригинальные аксессуары и запчасти для автомобилей Lixiang.'
          },
          {
            property: 'og:image',
            content: found.images[0]?.img || 'https://lixiang-uzbekistan.uz/logoblack.png'
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: `https://lixiang-uzbekistan.uz${locale.value !== 'ru' ? '/' + locale.value : ''}/productmore?id=${found.id}`
          }
        ],
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": found.name,
              "image": found.images[0]?.img || 'https://lixiang-uzbekistan.uz/fallback.png',
              "description": found.description || t('product.default_description'),
              "sku": `prod-${found.id}`,
              "brand": {
                "@type": "Brand",
                "name": "Lixiang"
              },
              "offers": {
                "@type": "Offer",
                "url": `https://lixiang-uzbekistan.uz${locale.value !== 'ru' ? '/' + locale.value : ''}/productmore?id=${found.id}`,
                "priceCurrency": "USD",
                "price": found.price,
                "availability": "https://schema.org/InStock"
              }
            })
          }
        ]
      })

    }
  } catch (e) {
    console.error('Ошибка загрузки товара:', e)
  } finally {
    loading.value = false
  }
})

const addToCart = () => {
  if (!product.value) return

  cart.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images[0]?.img || '',
    quantity: quantity.value,
    category: product.value.category
  })

  notificationMessage.value = `\u2705 ${product.value.name} добавлен в корзину!`
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 2500)
}



</script>
<style scoped>


.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 12px 20px;
  border-radius: 999px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  z-index: 9999;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.product-page {
  background: #f7f7f7;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.product-card {
  width: 100%;
  display: flex;
  gap: 40px;
  border-radius: 30px;
}

/* Карусель */
.carousel-wrapper {
  flex: 1;
  border-radius: 16px;
  padding: 15px;
  overflow: hidden;
  background: #fff;
  position: relative;

}
.carousel-img {
  width: 50%;
  height: 400px;
  object-fit: contain;

}
.carousel-scrollbar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.scrollbar-fill {
  height: 100%;
  background: #333;
  transition: transform 0.3s ease;
}

/* Инфо */
.info-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 24px;
  font-weight: bold;
}
.category {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 20px;
}
.description {
  font-size: 14px;
  color: #777;
  margin-bottom: 30px;
}
.price-line {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 20px;
}
.price-line .label {
  color: #aaa;
}
.price-line .price {
  font-weight: bold;
  font-size: 20px;
}

/* Количество */
.quantity {
  margin-bottom: 20px;
}
.quantity label {
  font-weight: bold;
  font-size: 16px;
}
.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  width: max-content;
  border-radius: 999px;
  padding: 5px 14px;
  gap: 16px;
  margin-top: 10px;
}
.quantity-controls button {
  background: none;
  border: none;
  font-size: 20px;
  width: 26px;
  height: 26px;
  cursor: pointer;
}

/* Кнопки */
.buttons {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  color: #000;
}
.buttons a{
  margin: 0;
  text-decoration: none;
  color: #000;
}
.add-btn {
  background: #ccc;
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.go-btn {
  background: white;
  border: 1px solid #ccc;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.go-btn .icon {
  font-size: 18px;
}

/* Адаптив */
@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
  }
  .carousel-img {
    height: 260px;
  }
}
</style>