
<template>
  <div class="configurator" v-if="model">
    <h1>Конфигуратор</h1>

    <div v-if="step === 1" class="model-more-color">
      <h3>Цвет кузова</h3>
      <img :src="activeColorImage" alt="car" class="car-image" />
      <div class="model-more-color-wrapper">
        <div
            v-for="(color, index) in model.color"
            :key="color.id"
            class="model-more-color-wrapper-item"
            :class="{ active: selectedColorIndex === index }"
            @click="setColor(index)"
        >
          <span :style="{ backgroundColor: color.hex_code }"></span>
          <h2>{{ color.name }}</h2>
        </div>
      </div>
    </div>

    <div v-if="step === 2" class="configurator-step">
      <h2>Диски</h2>
      <div class="wheel-options">
        <div
            v-for="(wheel, index) in model.wheel_option"
            :key="wheel.id"
            class="wheel-item"
            :class="{ active: selectedWheelIndex === index }"
            @click="selectWheel(index)"
        >
          <img :src="wheel.image" alt="wheel" />
          <p>{{ wheel.name }}</p>
        </div>
      </div>
    </div>

    <div v-if="step === 3" class="configurator-step">
      <h2>Интерьер</h2>
      <div class="interior-options">
        <div
            v-for="(interior, index) in model.interior"
            :key="interior.id"
            class="interior-item"
            :class="{ active: selectedInteriorIndex === index }"
            @click="selectInterior(index)"
        >
          <img :src="interior.image" alt="interior" />
          <p>{{ interior.name }}</p>
        </div>
      </div>
    </div>

    <div v-if="step === 4" class="configurator-step">
      <h2>Дополнительные опции</h2>
      <div class="extras-options">
        <div
            v-for="extra in model.additional_options"
            :key="extra.id"
            class="extra-item"
            :class="{ active: selectedExtras.includes(extra.id) }"
            @click="toggleExtra(extra.id)"
        >
          <img :src="extra.image" alt="extra-option" />
          <p>{{ extra.name }} — {{ extra.price }}$</p>
        </div>
      </div>
    </div>

    <div v-if="step === 5" class="configurator-step contact-step">
      <h2 class="contact-heading">Контактная информация</h2>
      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-grid">
          <div class="form-group">
            <label>Имя</label>
            <input v-model.trim="form.first_name" type="text" required />
          </div>
          <div class="form-group">
            <label>Фамилия</label>
            <input v-model.trim="form.last_name" type="text" required />
          </div>
          <div class="form-group">
            <label>Телефон</label>
            <input v-model.trim="form.phone_number" type="text" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model.trim="form.email" type="email" required />
          </div>
        </div>
        <div class="configurator-buttons">
          <button type="button" @click="prevStep">Назад</button>
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>

    <div v-else-if="step < 5" class="configurator-buttons">
      <button type="button" @click="prevStep">Назад</button>
      <button type="button" @click="nextStep">Далее</button>
    </div>
  </div>
  <div v-else>Загрузка...</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
const { locale } = useI18n()
const route = useRoute()
const model = ref<any>(null)
const step = ref(1)
const maxStep = 5

const selectedColorIndex = ref(0)
const selectedWheelIndex = ref(0)
const selectedInteriorIndex = ref(0)
const selectedExtras = ref<number[]>([])

const form = ref({
  first_name: '',
  last_name: '',
  phone_number: '',
  email: ''
})

const setColor = (index: number) => {
  selectedColorIndex.value = index
}

const selectWheel = (index: number) => {
  selectedWheelIndex.value = index
}

const selectInterior = (index: number) => {
  selectedInteriorIndex.value = index
}

const toggleExtra = (id: number) => {
  const i = selectedExtras.value.indexOf(id)
  if (i === -1) selectedExtras.value.push(id)
  else selectedExtras.value.splice(i, 1)
}

const activeColorImage = computed(() => {
  return model.value?.color?.[selectedColorIndex.value]?.image || ''
})

const nextStep = () => {
  if (step.value < maxStep) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const submitForm = async () => {
  try {
    const payload: any = {
      ...form.value,
      car_model: model.value.id,
      car_color: model.value.color[selectedColorIndex.value].id,
      wheels: model.value.wheel_option[selectedWheelIndex.value].id,
      interior: model.value.interior[selectedInteriorIndex.value].id,
      additional_options: selectedExtras.value
    }
    await axios.post('https://api.lixiang-uzbekistan.uz/api/configurator/', payload)
    alert('Заявка отправлена успешно!')
  } catch (err) {
    console.error('Ошибка отправки:', err)
    alert('Ошибка при отправке. Проверьте данные.')
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`https://api.lixiang-uzbekistan.uz/api/models/${route.query.id}/`, {
      headers: {
        'Accept-Language': locale.value
      }
    })
    model.value = res.data
  } catch (err) {
    console.error('Ошибка загрузки модели:', err)
  }
})
</script>

<style scoped>
@import "configurator.css";
.configurator {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.model-more-color-wrapper,
.wheel-options,
.interior-options,
.extras-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}
.configurator-step{
  background: #fff;
  padding: 30px;
  border-radius: 30px;

}
.configurator-step h2{
  margin-top: 0;
}
.wheel-item,
.interior-item,
.extra-item {
  border: 1px solid #ccc;
  border-radius: 30px;
  padding: 1rem;
  cursor: pointer;
  width: 240px;
  transition: 0.3s ease;
  text-align: center;
}
.wheel-item.active,
.interior-item.active,
.extra-item.active {
  border: 2px solid #000;
  background: #f9f9f9;
}
.car-image,
.wheel-item img,
.interior-item img,
.extra-item img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.configurator-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 2rem;
}
.configurator-buttons button {
  padding: 13px 50px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #BFBFBF;
  background: transparent;
  cursor: pointer;
  border: 1px solid #BFBFBF;
}
.configurator-buttons button:nth-child(2) {
  background: #BFBFBF;
  color: #fff;

}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.contact-step {
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  text-align: left;
}
.contact-heading {
  text-align: center;
  margin-bottom: 2rem;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.form-group label {
  font-weight: 600;
  margin-bottom: 0.3rem;
  display: block;
}
.form-group input {
  width: 100%;
  padding: 12px;
  border-radius: 9999px;
  border: 1px solid #ddd;
  font-size: 15px;
  background: #f9f9f9;
}
.form-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}
.form-checkbox input[type="checkbox"] {
  margin-top: 3px;
}
</style>