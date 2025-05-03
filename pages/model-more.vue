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

    <div class="model-more-interier">
      <h2>

        Пользуйтесь электричесивом?
        <span>Подключайте бытовые электроприборы на открытом воздухе</span>
      </h2>

      <div class="model-more-interier-wrapper">
        <div class="model-more-interier-item">
          <img :src="Electric" alt="interier"/>
          <h4>Источник питания 3,5 кВт</h4>
          <p>Тостовый хлеб или говядина барбекю. Готовьте свободно с электричеством, как дома.</p>
        </div>

        <div class="model-more-interier-item">
          <img :src="Electric2" alt="interier"/>
          <h4>Разнообразие розеток</h4>
          <p>Шесть портов Type-C, две розетки 12 В и одну розетку 220 В для ноутбуков и других устройств.</p>
        </div>
      </div>
    </div>
    <div class="smart-driving">
      <div class="smart-driving-text">
        <h2>Умная система вождения</h2>
        <h3>Интелектуальная система вождения Full-Syack Li AD MAX</h3>
        <p>
          Два процессора NVIDIA Orin-X с общей вычислительной мощностью 508 TOPS могут эффективно
          обрабатывать параллельные сигналы от датчиков в режиме реального времени, оцифровывая
          окружающую дорожную обстановку в реальном времени.
        </p>
      </div>

      <div class="smart-driving-content">
        <img :src="SmartImage" alt="smart-driving" />

        <div class="smart-driving-boxes">
          <div class="smart-driving-box">
            <h4>Предупреждает о возможном столкновении</h4>
            <p>
              Определяет сценарии столкновения, особенно приближение грузовиков с большой разницей в скорости.
            </p>
          </div>
          <div class="smart-driving-box">
            <h4>Выявляет аварийные ситуации на дороге.</h4>
            <p>
              Идентифицирует дорожно-транспортные происшествия даже без машин и в ночное время
            </p>
          </div>
          <div class="smart-driving-box">
            <h4>Видит препятствия и строительные работы</h4>
            <p>
              Определяет дорожные конусы и разделители для предотвращения столкновений, заполненные водой барьеры и другие дорожные ограждения.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="model-more-adas-tabs">
      <div class="adas-tab-group">
        <button
            v-for="(option, index) in adasOptions"
            :key="index"
            :class="{ active: selectedAdas.title === option.title }"
            @click="setAdas(option)"
        >
          {{ option.title }}
        </button>
      </div>

      <img :src="adasImage" alt="ADAS Image" class="adas-image" />
    </div>

    <div class="safety-section">
      <h2>Безопасность всей семьи</h2>
      <p class="safety-subtitle">
        Li L9 получил несколько высших оценок (G) «Индекса безопасности автомобилей Китая (C-IASI)»,
        став первой большой моделью внедорожника, получившей оценку G со стороны водителя и со стороны пассажира
      </p>

      <div class="safety-grid">
        <!-- Верхний блок -->
        <div class="safety-main">
          <img :src="SafetyMain" alt="Безопасность салона" />
          <div class="safety-text-block">
            <h3>Флагманская схема подушек безопасности</h3>
            <p>
              Подушки безопасности расположены в 12 местах по всему автомобилю, включая 2 передние и 2 боковые подушки безопасности для первого ряда,
              2 боковые подушки безопасности для второго ряда и шторки безопасности с обеих сторон, проходящие через все три ряда.
            </p>
          </div>
        </div>

        <!-- Средний блок -->
        <div class="safety-feature">
          <div class="safety-text-block">
            <h3>Прочная конструкция автомобиля</h3>
            <p>
              Соотношение высокопрочной и термоформованной стали более 80% в сочетании с двойными передними балками из алюминиевого сплава
              позволяет Li L9 смягчить лобовой удар и защитить водителя и пассажиров.
            </p>
          </div>
          <img :src="SafetyFrame" alt="Каркас кузова" />
        </div>

        <!-- Нижний блок -->
        <div class="safety-feature">
          <img :src="Battery" alt="Защита аккумулятора" />
          <div class="safety-text-block">
            <h3>Двойная защита аккумулятора</h3>
            <p>
              Боковая защитная балка и корпус из алюминиевого сплава обеспечивают безопасность аккумуляторной батареи даже при повреждении боковой проекции и шасси.
            </p>
          </div>
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

import SafetyMain from '@/assets/models/safety/safety1.png';
import SafetyFrame from '@/assets/models/safety/safety2.png';
import Battery from '@/assets/models/safety/safety3.png';

import SmartImage from '@/assets/models/adwantages/auto.png';

import Interier from "@/assets/models/interier/interier.png"
import Interier2 from "@/assets/models/interier/interier2.png"
import Interier3 from "@/assets/models/interier/interier3.png"
import Interier4 from "@/assets/models/interier/interier4.png"
import Interier5 from "@/assets/models/interier/interier5.png"
import Interier6 from "@/assets/models/interier/interier6.png"

import Electric from "@/assets/models/interier/electric1.png"
import Electric2 from "@/assets/models/interier/electric2.png";



const adasOptions = [
  { title: 'Навигация по ADAS', image: () => import('@/assets/models/adwantages/plus1.png') },
  { title: 'Ассистент движения в полосе', image: () => import('@/assets/models/adwantages/plus2.jpg') },
  { title: 'Автоматическая помощь при парковке', image: () => import('@/assets/models/adwantages/plus3.jpg') }
];

const selectedAdas = ref(adasOptions[0]);
const adasImage = ref<string>('');

const setAdas = async (option) => {
  selectedAdas.value = option;
  const img = await option.image();
  adasImage.value = img.default;
};

setAdas(selectedAdas.value);

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