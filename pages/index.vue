<template>
  <div class="main">

    <header class="main-header">
      <img :src="Header" alt="logo"/>
      <img class="main-header-img1" :src="LiText" alt="logo"/>
    </header>

    <main class="main-content">
      <h2>Модели</h2>
      <div class="main-content-models">
        <div class="main-content-models-item">
          <img :src="Model7" alt="li7">
          <div class="main-content-models-item-text">
            <h3>L7 <span>От 40 000$</span></h3>
          </div>
        </div>
        <div class="main-content-models-item">
          <img :src="Model8" alt="li8">
          <div class="main-content-models-item-text">
            <h3>L8 <span>От 50 000$</span></h3>
          </div>
        </div>
        <div class="main-content-models-item">
          <img :src="Model9" alt="li9">
          <div class="main-content-models-item-text">
            <h3>L9 <span>От 60 000$</span></h3>
          </div>
        </div>
      </div>
      <div class="main-content-models-bottom">
        <div class="main-content-models-bottom-left">
          <h3>Lixiang 9 L9</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
            aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos.</p>
          <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
            aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
          <NuxtLink>
            Узнать больше
          </NuxtLink>
        </div>
        <div class="main-content-models-bottom-right">
          <img :src="Model9" alt="li9">
          <h3>L9 <span>От 60 000$</span></h3>
          <div class="main-content-models-bottom-right-text">
            <NuxtLink>Построй свой L9</NuxtLink>
            <NuxtLink>Все L9 модели</NuxtLink>
          </div>
        </div>
      </div>
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
      <div class="main-content-market">
        <h3>Магазин</h3>
        <div class="main-content-market-wrapper">
          <div class="main-content-market-item">
            <img :src="Market" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>

          <div class="main-content-market-item">
            <img :src="Market2" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>

          <div class="main-content-market-item">
            <img :src="Market" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>

          <div class="main-content-market-item">
            <img :src="Market2" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>
          <div class="main-content-market-item">
            <img :src="Market" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>

          <div class="main-content-market-item">
            <img :src="Market2" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>
          <div class="main-content-market-item">
            <img :src="Market" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>

          <div class="main-content-market-item">
            <img :src="Market2" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>
          <div class="main-content-market-item">
            <img :src="Market" alt="li9">
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink>В корзину</NuxtLink>
          </div>

        </div>
        <NuxtLink class="main-content-models-item-link">
          Смотреть еще
        </NuxtLink>
      </div>
      <div class="main-content-contact">
        <h3>Контакты</h3>
        <div class="main-content-contact-wrapper">
          <div class="main-content-contact-left">
            <h4>Филлиалы</h4>
            <button>Ташкент</button>
            <h4>Адрес</h4>
            <p>Мирабадский район, улица Тараса Шевченко 25А, Lixiang Auto part</p>
            <div class="main-content-contact-left-info">
              <div class="main-content-contact-left-info-item">
                <h4>Контактный телефон</h4>
                <NuxtLink>+998 90 999 99 99</NuxtLink>
                <NuxtLink>+998 90 999 99 99</NuxtLink>
              </div>
              <div class="main-content-contact-left-info-item">
                <h4>Время работы</h4>
                <NuxtLink>ПН-ПТ 24/7</NuxtLink>
                <NuxtLink>СБ-ВС 8:00 - 20:00</NuxtLink>
              </div>
            </div>
          </div>
          <div class="main-content-contact-right">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.5064760221544!2d69.29120127661356!3d41.297844301543655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5a801ddb953%3A0x4a98d90dabc4969d!2syas%20auto!5e0!3m2!1sru!2s!4v1746028803104!5m2!1sru!2s" width="100%" height="100%" style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

        </div>
        <NuxtLink class="main-content-models-item-link">
          Оставить заявку
        </NuxtLink>
      </div>
      <div class="main-content-about">
        <h3>О нас</h3>
        <div class="main-content-about-wrapper">
          <img :src="Video" alt="vidoe">
          <div class="main-content-about-text">
            <h2>Lorem Ipsum</h2>
            <p>Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.Ω</p>
          </div>
        </div>
        <div class="main-content-about-wrapper">
          <div class="main-content-about-text">
            <h2>Lorem Ipsum</h2>
            <p>Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.Ω</p>
          </div>
          <img :src="Video2" alt="vidoe">

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/assets/headerli.png';
import LiText from "@/assets/litext.png";
import Model7 from '@/assets/li7.png';
import Model8 from '@/assets/li8.png';
import Model9 from '@/assets/li9.png';
import Li9 from '@/assets/Li99.png';
import Market from '@/assets/market.png';
import Market2 from '@/assets/market2.png';
import Video from '@/assets/vid1.png'
import Video2 from '@/assets/vid1.png'

</script>

<style>
@import './index.css';
</style>