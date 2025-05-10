<template>
  <div class="cart-page">
    <h1 class="title">Корзина</h1>

    <!-- Список товаров -->
    <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
      <img :src="item.image" alt="Product Image" class="item-image" />
      <div class="item-info">
        <h3 class="item-name">{{ item.name }}</h3>
        <p class="item-category">{{ item.category }}</p>
      </div>
      <div class="item-price">{{ item.price.toLocaleString() }} UZS</div>
      <div class="quantity-controls">
        <button @click="decrement(index)">−</button>
        <span>{{ item.quantity }}</span>
        <button @click="increment(index)">+</button>
      </div>
    </div>

    <!-- Форма и итого -->
    <div class="form-total">
      <div class="form">
        <input v-model="form.firstName" type="text" placeholder="Имя*" :class="{ invalid: errors.firstName }" />
        <input v-model="form.lastName" type="text" placeholder="Фамилия*" :class="{ invalid: errors.lastName }" />
        <input v-model="form.phone" type="text" placeholder="Номер телефона" :class="{ invalid: errors.phone }" />
        <textarea v-model="form.comment" placeholder="Комментарий"></textarea>
      </div>

      <div class="summary">
        <p><strong>Итого:</strong> {{ totalPrice.toLocaleString() }} UZS</p>
        <button class="submit-btn" @click="submitForm">Заявка дилеру</button>
        <p v-if="hasError" class="error-msg">Пожалуйста, заполните обязательные поля</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Img1 from '@/assets/market.png'
import Img2 from '@/assets/market2.png'
import { ref, computed } from 'vue'

const cartItems = ref([
  { name: 'Lixiang R20–R23', category: 'Колесные диски', price: 3400000, quantity: 1, image: Img1 },
  { name: 'Lixiang R20–R23', category: 'Колесные диски', price: 3400000, quantity: 1, image: Img2 }
])

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

const increment = (i) => {
  cartItems.value[i].quantity++
}
const decrement = (i) => {
  if (cartItems.value[i].quantity > 1) {
    cartItems.value[i].quantity--
  }
}

const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function submitForm() {
  errors.value.firstName = !form.value.firstName.trim()
  errors.value.lastName = !form.value.lastName.trim()
  errors.value.phone = !form.value.phone.trim()

  if (errors.value.firstName || errors.value.lastName || errors.value.phone) {
    hasError.value = true
    return
  }

  hasError.value = false
  alert('Форма успешно отправлена!')
  // тут можно отправить form.value + cartItems.value на сервер
}
</script>

<style scoped>
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

/* Товар */
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

/* Форма + итого */
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

/* Адаптивность */
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
