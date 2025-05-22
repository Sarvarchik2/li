<template>
  <div class="cart-page">
    <h1 class="title">{{ $t('cart.title') }}</h1>

    <!-- Корзина -->
    <div v-if="cartItems.length">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <img :src="item.image" alt="Product Image" class="item-image" />
        <div class="item-info">
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-category">{{ item.category }}</p>
        </div>
        <div class="item-price">{{ item.price.toLocaleString() }} $</div>
        <div class="quantity-controls">
          <button @click="decrement(index)">−</button>
          <span>{{ item.quantity }}</span>
          <button @click="increment(index)">+</button>
          <button class="remove-btn" @click="remove(index)">✖</button>
        </div>
      </div>

      <!-- Форма и итого -->
      <div class="form-total">
        <div class="form">
          <input v-model="form.firstName" type="text" :placeholder="$t('form.first_name')" :class="{ invalid: errors.firstName }" />
          <input v-model="form.lastName" type="text" :placeholder="$t('form.last_name')" :class="{ invalid: errors.lastName }" />
          <input v-model="form.phone" type="text" :placeholder="$t('form.phone')" :class="{ invalid: errors.phone }" />
          <textarea v-model="form.comment" :placeholder="$t('form.comment')"></textarea>
        </div>

        <div class="summary">
          <p><strong>{{ $t('cart.total') }}</strong> {{ totalPrice.toLocaleString() }} $</p>
          <button class="submit-btn" @click="submitForm">{{ $t('form.submit') }}</button>
          <p v-if="hasError" class="error-msg">{{ $t('form.error') }}</p>
        </div>
      </div>
    </div>

    <!-- Пустая корзина -->
    <div v-else class="empty-cart">
      <p class="empty-text">{{ $t('cart.empty') }}</p>
      <NuxtLink to="/market" class="market-link">{{ $t('cart.go_to_market') }}</NuxtLink>
    </div>
    <transition name="fade">
      <div v-if="showSuccess" class="notification">✅ Заказ успешно отправлен!</div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const cartItems = computed(() => cart.items)
const totalPrice = computed(() => cart.totalPrice)

const increment = (i) => cart.increment(i)
const decrement = (i) => cart.decrement(i)
const remove = (i) => cart.remove(i)

const form = ref({
  firstName: '',
  lastName: '',
  phone: '',
  comment: ''
})

const errors = ref({
  firstName: false,
  lastName: false,
  phone: false
})

const hasError = ref(false)

import axios from 'axios'
const showSuccess = ref(false)
async function submitForm() {
  errors.value.firstName = !form.value.firstName.trim()
  errors.value.lastName = !form.value.lastName.trim()
  errors.value.phone = !form.value.phone.trim()

  if (errors.value.firstName || errors.value.lastName || errors.value.phone) {
    hasError.value = true
    return
  }

  hasError.value = false

  const payload = {
    name: `${form.value.firstName} ${form.value.lastName}`,
    phone_number: form.value.phone,
    comment: form.value.comment,
    sent_to_telegram: false,
    items: cartItems.value.map(item => ({
      product: item.id,
      quantity: item.quantity
    }))
  }

  try {
    await axios.post('https://api.lixiang-uzbekistan.uz/api/market-orders/', payload)
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
    cart.clearCart()
  } catch (error) {
    console.error(error)
    alert('❌ Ошибка при отправке заказа. Попробуйте позже.')
  }
}

</script>

<style scoped>


.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #000;
  color: white;
  padding: 12px 20px;
  border-radius: 999px;
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

.cart-page {
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
  background: #f8f8f8;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 30px;
}

.cart-item {
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  gap: 20px;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
  background: #f2f2f2;
}

.item-info {
  flex-grow: 1;
}

.item-name {
  margin: 0;
  font-size: 18px;
}

.item-category {
  margin: 0;
  color: #777;
  font-size: 14px;
}

.item-price {
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 999px;
  padding: 5px 10px;
  gap: 10px;
}

.quantity-controls button {
  background: none;
  border: none;
  font-size: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.remove-btn {
  background: none;
  border: none;
  color: #000;
  font-size: 18px;
  cursor: pointer;
  margin-left: 6px;
}

.form-total {
  background: white;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.form {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form input,
.form textarea {
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 999px;
  font-size: 14px;
  transition: 0.2s;
}

.form textarea {
  border-radius: 20px;
  min-height: 100px;
  resize: none;
}

.invalid {
  border-color: #e74c3c !important;
}

.summary {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.submit-btn {
  background: #d3d3d3;
  color: #333;
  padding: 12px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  margin-top: 10px;
}

.error-msg {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  margin-top: 40px;
}

.empty-text {
  font-size: 20px;
  color: #777;
  margin-bottom: 20px;
}

.market-link {
  display: inline-block;
  background: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: bold;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: center;
  }

  .form-total {
    flex-direction: column;
  }

  .form,
  .summary {
    width: 100%;
  }
}
</style>
