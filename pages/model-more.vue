<template>
  <div class="model-more">
    <div class="main-content-model">
      <h3>Один клик к вашему новому Lixiang
        <span>Создайте свой идеальный LiXiang с помощью конфигуратора</span>
      </h3>
      <img :src="Li9" alt="">
      <div class="main-content-model-content">
        <div class="main-content-models-item-text">
          <div class="main-content-models-item-text-item">
            <h4>5 218 мм</h4>
            <p>Длина</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>1 998 мм</h4>
            <p>Ширина</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>1 800 мм</h4>
            <p>Высота</p>
          </div>
          <div class="main-content-models-item-text-item">
            <h4>3 105 мм</h4>
            <p>Колесзная база</p>
          </div>
        </div>
        <NuxtLink class="main-content-models-item-link">
          Конфигуратор
        </NuxtLink>
      </div>
    </div>
    <div class="model-more-config">
      <div class="model-more-config-item">
        <img :src="Fuel" alt="fuel"/>
        <h3>
          1300 км
          <span>Запас хода</span>
        </h3>
      </div>

      <div class="model-more-config-item">
        <img :src="History" alt="fuel"/>
        <h3>
          5,3 сек
          <span>0 - 100 км/ч</span>
        </h3>
      </div>

      <div class="model-more-config-item">
        <img :src="Speed" alt="fuel"/>
        <h3>
          180 км/ч
          <span>Максимальная скорость</span>
        </h3>
      </div>

      <div class="model-more-config-item">
        <img :src="Gps" alt="fuel"/>
        <h3>
          Автопилот
          <span>Автоматияская парковка</span>
        </h3>
      </div>
    </div>
    <div class="model-more-color">
      <h3>Цвет кузова</h3>
      <img :src="carImage" alt="car" class="car-image"/>
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

    <div class="model-more-interier">
      <h2>

        Интерьер
        <span>Комфортное пространство — огромный салон и <br> комфортабельные кресла для каждого члена семьи</span>
      </h2>

      <div class="model-more-interier-wrapper">
        <div class="model-more-interier-item">
          <img :src="Interier" alt="interier"/>
          <h4>4 передних кресла для сна</h4>
        </div>

        <div class="model-more-interier-item">
          <img :src="Interier2" alt="interier"/>
          <h4>Двухпанельный панорманый люк</h4>
        </div>

        <div class="model-more-interier-item">
          <img :src="Interier3" alt="interier"/>
          <h4>256-цветная подсветка салона</h4>
        </div>

        <div class="model-more-interier-item">
          <img :src="Interier5" alt="interier"/>
          <h4>Двойные беспроводные зарядки</h4>
        </div>

        <div class="model-more-interier-item">
          <img :src="Interier4" alt="interier"/>
          <h4>Холодильник во втором ряду</h4>
        </div>

        <div class="model-more-interier-item">
          <img :src="Interier6" alt="interier"/>
          <h4>Двойные беспроводные зарядки</h4>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Li9 from '@/assets/Li99.png'
import Fuel from "@/assets/models/fuel.png"
import Speed from "@/assets/models/speed.png"
import History from "@/assets/models/history.png"
import Gps from "@/assets/models/gps.png"

import Interier from "@/assets/models/interier/interier.png"
import Interier2 from "@/assets/models/interier/interier2.png"
import Interier3 from "@/assets/models/interier/interier3.png"
import Interier4 from "@/assets/models/interier/interier4.png"
import Interier5 from "@/assets/models/interier/interier5.png"
import Interier6 from "@/assets/models/interier/interier6.png"
// Цвета и картинки кузова
const colorOptions = [
  {
    name: 'Silver Metallic',
    hex: '#D9D9D9',
    image: () => import('@/assets/models/color.png')
  },
  {
    name: 'Gray Metallic',
    hex: '#4D4D4D',
    image: () => import('@/assets/models/color.png')
  },
  {
    name: 'Black Metallic',
    hex: '#1F1F1F',
    image: () => import('@/assets/models/color.png')
  },
  {
    name: 'Golden Metallic',
    hex: '#D6C8B2',
    image: () => import('@/assets/models/color.png')
  },
  {
    name: 'Tech Blue',
    hex: '#9BB4CD',
    image: () => import('@/assets/models/color.png')
  },
  {
    name: 'Deep Green',
    hex: '#47614C',
    image: () => import('@/assets/models/color.png')
  },
  {
    name: 'Purple Light',
    hex: '#8B6C94',
    image: () => import('@/assets/models/color.png')
  }
];

// Активный цвет и изображение
const activeColor = ref(colorOptions[0]);
const carImage = ref<string>('');

// Подгрузка картинки по цвету
const setColor = async (color) => {
  activeColor.value = color;
  const imgModule = await color.image();
  carImage.value = imgModule.default;
};

// Инициализация
setColor(activeColor.value);

</script>


<style>
@import "./model-more.css";
</style>