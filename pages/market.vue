<!--<template>-->
<!--  <div class="market">-->
<!--    <div class="main-content-market">-->
<!--      <h3>{{ $t('main.shop') }}</h3>-->
<!--      <div class="main-content-market-wrapper">-->
<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->

<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market2" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->

<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->

<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market2" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->
<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->

<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market2" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->
<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->

<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market2" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->
<!--        <div class="main-content-market-item">-->
<!--          <img :src="Market" alt="li9">-->
<!--          <h4>Lixiang R20-R23</h4>-->
<!--          <p>Колесные диски</p>-->
<!--          <h5>3.400.000 UZS</h5>-->
<!--          <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>-->
<!--        </div>-->

<!--      </div>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import Market from "assets/market.png";-->
<!--import Market2 from "assets/market2.png";-->
<!--</script>-->

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
          <img :src="product.img" :alt="product.name" />
          <h4>{{ product.name }}</h4>
          <p>{{ $t('main.category') }}: {{ product.category }}</p>
          <h5>{{ formatPrice(product.price) }} UZS</h5>
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

interface Product {
  id: number
  name: string
  img: string
  price: number
  category: number
}

const products = ref<Product[]>([])
const loading = ref(true)

const formatPrice = (value: number) => {
  return value.toLocaleString('ru-RU', { minimumFractionDigits: 0 })
}

onMounted(async () => {
  try {
    const response = await axios.get('http://173.212.193.32:8001/api/market-models/')
    products.value = response.data
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
  padding: 15px;
  text-align: center;
  border-radius: 12px;
  background-color: #fff;
}


</style>
