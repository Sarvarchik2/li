<template>
  <div class="configurator">
    <h1>{{ $t('configurator.title') }}</h1>

    <div v-if="step === 1" class="model-more-color">
      <h3>{{ $t('configurator.color') }}</h3>

      <img :src="carImage" alt="car" class="car-image" />
      <div class="model-more-color-wrapper">
        <div
            v-for="(color, index) in colorOptions"
            :key="index"
            class="model-more-color-wrapper-item"
            :class="{ active: color.name === activeColor.name }"
            @click="setColor(color)"
        >
          <span :style="{ backgroundColor: color.hex }"></span>
          <h2>{{ color.name }}</h2>
        </div>
      </div>
    </div>

    <div v-if="step === 2" class="configurator-step">
      <h2>{{ $t('configurator.wheels') }}</h2>
      <div class="wheel-options">
        <div
            v-for="(wheel, index) in wheelOptions"
            :key="index"
            class="wheel-item"
            :class="{ active: wheel.name === selectedWheel.name }"
            @click="selectWheel(wheel)"
        >
          <img :src="wheel.image" alt="wheel" />
          <p>{{ wheel.name }}</p>
        </div>
      </div>
    </div>

    <div v-if="step === 3" class="configurator-step">
      <h2>{{ $t('configurator.interior') }}</h2>
      <div class="interior-options">
        <div
            v-for="(interior, index) in interiorOptions"
            :key="index"
            class="interior-item"
            :class="{ active: interior.name === selectedInterior.name }"
            @click="selectInterior(interior)"
        >
          <img :src="interior.image" alt="interior" />
          <p>{{ interior.name }}</p>
        </div>
      </div>
    </div>

    <div v-if="step === 4" class="configurator-step">
      <h2>{{ $t('configurator.extras') }}</h2>
      <div class="extras-options">
        <div
            v-for="(extra, index) in extras"
            :key="index"
            class="extra-item"
            :class="{ active: extra.selected }"
            @click="toggleExtra(extra)"
        >
          <img :src="extra.image" alt="extra-option" />
          <p>{{ extra.name }} — {{ extra.price }}$</p>
        </div>
      </div>
    </div>

    <div v-if="step === 5" class="configurator-step contact-step">
      <h2 class="contact-heading">{{ $t('configurator.contact_heading') }}</h2>
      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-grid">
          <div class="form-group">
            <label>{{ $t('form.first_name') }}</label>
            <input v-model.trim="form.name" type="text" :placeholder="$t('form.name_placeholder')" required />
          </div>
          <div class="form-group">
            <label>{{ $t('form.phone') }}</label>
            <input v-model.trim="form.phone" type="tel" :placeholder="$t('form.phone_placeholder')" required pattern="^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$" />
          </div>
          <div class="form-group">
            <label>{{ $t('form.last_name') }}</label>
            <input v-model.trim="form.lastname" type="text" :placeholder="$t('form.lastname_placeholder')" required />
          </div>
          <div class="form-group">
            <label>{{ $t('form.email') }}</label>
            <input v-model.trim="form.email" type="email" :placeholder="$t('form.email_placeholder')" required />
          </div>
        </div>
        <div class="form-checkbox">
          <input type="checkbox" v-model="form.agree" id="agree" required />
          <label for="agree">{{ $t('form.agreement') }}</label>
        </div>
        <div class="configurator-buttons">
          <button type="button" @click="prevStep">{{ $t('form.back') }}</button>
          <button type="submit" :disabled="!formValid">{{ $t('form.submit') }}</button>

        </div>
      </form>
    </div>
    <div v-else-if="step < 5" class="configurator-buttons">
      <button type="button" @click="prevStep">{{ $t('form.back') }}</button>
      <button type="button" @click="nextStep">{{ $t('form.next') }}</button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1)
const maxStep = 5

const colorOptions = [
  { name: 'Silver Metallic', hex: '#D9D9D9', image: () => import('@/assets/models/color.png') },
  { name: 'Black Metallic', hex: '#1F1F1F', image: () => import('@/assets/models/color.png') },
  { name: 'Tech Blue', hex: '#9BB4CD', image: () => import('@/assets/models/color.png') },
  { name: 'Golden', hex: '#D6C8B2', image: () => import('@/assets/models/color.png') }
]

const wheelOptions = [
  { name: 'R20 Sport', image: new URL('@/assets/models/wheels/wheel1.png', import.meta.url).href },
  { name: 'R21 Elegant', image: new URL('@/assets/models/wheels/wheel2.png', import.meta.url).href },
  { name: 'R22 Classic', image: new URL('@/assets/models/wheels/wheel3.png', import.meta.url).href }
]

const interiorOptions = [
  { name: 'Черный салон', image: new URL('@/assets/models/salon/salon1.png', import.meta.url).href },
  { name: 'Бежевый салон', image: new URL('@/assets/models/salon/salon2.png', import.meta.url).href },
  { name: 'Коричневый салон', image: new URL('@/assets/models/salon/salon3.png', import.meta.url).href }
]

const extras = ref([
  { name: 'Панорамная крыша', price: 1200, selected: false, image: new URL('@/assets/models/dop.png', import.meta.url).href },
  { name: 'Доп. шумоизоляция', price: 600, selected: false, image: new URL('@/assets/models/dop.png', import.meta.url).href }
])

const form = ref({
  name: '',
  lastname: '',
  phone: '',
  email: '',
  agree: false
})

const activeColor = ref(colorOptions[0])
const selectedWheel = ref(wheelOptions[0])
const selectedInterior = ref(interiorOptions[0])
const carImage = ref('')

const setColor = async (color) => {
  activeColor.value = color
  const img = await color.image()
  carImage.value = img.default
}

setColor(activeColor.value)

const selectWheel = (wheel) => {
  selectedWheel.value = wheel
}

const selectInterior = (interior) => {
  selectedInterior.value = interior
}

const toggleExtra = (extra) => {
  extra.selected = !extra.selected
}

const nextStep = () => {
  if (step.value < maxStep) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}
const formValid = computed(() => {
  return form.value.name && form.value.lastname && form.value.phone && form.value.email && form.value.agree
})

const submitForm = () => {
  if (!formValid.value) return
  alert('Форма успешно отправлена!')
}
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