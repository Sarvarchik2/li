<template>
  <div class="main">
    <header class="main-header">
      <img :src="Header" alt="logo" />
      <img class="main-header-img1" :src="LiText" alt="logo" />
    </header>

    <main class="main-content">
      <h2>{{ $t('main.models') }}</h2>
      <div class="main-content-models">
        <NuxtLink to="/model-more" class="main-content-models-item">
          <img :src="Model7" alt="li7" />
          <div class="main-content-models-item-text">
            <h3>L7 <span>40 000$ {{ $t('main.from') }}</span></h3>
          </div>
        </NuxtLink>
        <NuxtLink to="/model-more" class="main-content-models-item">
          <img :src="Model8" alt="li8" />
          <div class="main-content-models-item-text">
            <h3>L8 <span>50 000$ {{ $t('main.from') }}</span></h3>
          </div>
        </NuxtLink>
        <NuxtLink to="/model-more" class="main-content-models-item">
          <img :src="Model9" alt="li9" />
          <div class="main-content-models-item-text">
            <h3>L9 <span> 60 000$ {{ $t('main.from') }}</span></h3>
          </div>
        </NuxtLink>
      </div>

      <div class="main-content-models-bottom">
        <div class="main-content-models-bottom-left">
          <h3>Lixiang 9 L9</h3>
          <p>{{ $t('main.lorem_text') }}</p>
          <NuxtLink to="/model-more">{{ $t('main.learn_more') }}</NuxtLink>
        </div>
        <div class="main-content-models-bottom-right">
          <img :src="Model9" alt="li9" />
          <h3>L9 <span> 60 000$ {{ $t('main.from') }}</span></h3>
          <div class="main-content-models-bottom-right-text">
            <NuxtLink to="/model-more">{{ $t('main.build_l9') }}</NuxtLink>
            <NuxtLink to="/model-more">{{ $t('main.all_l9') }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="main-content-model">
        <h3>{{ $t('main.one_click') }}<span>{{ $t('main.create_ideal') }}</span></h3>
        <img :src="Li9" alt="" />
        <div class="main-content-model-content">
          <div class="main-content-models-item-text">
            <div class="main-content-models-item-text-item">
              <h4>5 218 мм</h4>
              <p>{{ $t('main.length') }}</p>
            </div>
            <div class="main-content-models-item-text-item">
              <h4>1 998 мм</h4>
              <p>{{ $t('main.width') }}</p>
            </div>
            <div class="main-content-models-item-text-item">
              <h4>1 800 мм</h4>
              <p>{{ $t('main.height') }}</p>
            </div>
            <div class="main-content-models-item-text-item">
              <h4>3 105 мм</h4>
              <p>{{ $t('main.wheelbase') }}</p>
            </div>
          </div>
          <NuxtLink to="/models" class="main-content-models-item-link">
            {{ $t('main.configurator') }}
          </NuxtLink>
        </div>
      </div>

      <div class="main-content-market">
        <h3>{{ $t('main.shop') }}</h3>
        <div class="main-content-market-wrapper">
          <div v-for="n in 9" :key="n" class="main-content-market-item">
            <img :src="n % 2 === 0 ? Market2 : Market" alt="li9" />
            <h4>Lixiang R20-R23</h4>
            <p>Колесные диски</p>
            <h5>3.400.000 UZS</h5>
            <NuxtLink to="/productmore">{{ $t('main.more') }}</NuxtLink>
          </div>
        </div>
        <NuxtLink to="/market" class="main-content-models-item-link">
          {{ $t('main.see_more') }}
        </NuxtLink>
      </div>

      <div class="main-content-contact">
        <h3>{{ $t('main.contact') }}</h3>
        <div class="main-content-contact-wrapper">
          <div class="main-content-contact-left">
            <h4>{{ $t('main.branches') }}</h4>
            <button>Ташкент</button>
            <h4>{{ $t('main.address') }}</h4>
            <p>Мирабадский район, улица Тараса Шевченко 25А, Lixiang Auto part</p>
            <div class="main-content-contact-left-info">
              <div class="main-content-contact-left-info-item">
                <h4>{{ $t('main.phone') }}</h4>
                <NuxtLink>+998 90 999 99 99</NuxtLink>
                <NuxtLink>+998 90 999 99 99</NuxtLink>
              </div>
              <div class="main-content-contact-left-info-item">
                <h4>{{ $t('main.worktime') }}</h4>
                <NuxtLink>ПН-ПТ 24/7</NuxtLink>
                <NuxtLink>СБ-ВС 8:00 - 20:00</NuxtLink>
              </div>
            </div>
          </div>
          <div class="main-content-contact-right">
            <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" style="border:0;" loading="lazy"></iframe>
          </div>
        </div>
        <NuxtLink to="/contact" class="main-content-models-item-link">
          {{ $t('main.leave_request') }}
        </NuxtLink>
      </div>

      <div class="main-content-about" id="about-us">
        <h3>{{ $t('main.about') }}</h3>
        <div class="main-content-about-wrapper">
          <img :src="Video" alt="video" />
          <div class="main-content-about-text">
            <h2>{{ $t('main.lorem_title') }}</h2>
            <p>{{ $t('main.lorem_text') }}</p>
          </div>
        </div>
        <div class="main-content-about-wrapper">
          <div class="main-content-about-text">
            <h2>{{ $t('main.lorem_title') }}</h2>
            <p>{{ $t('main.lorem_text') }}</p>
          </div>
          <img :src="Video2" alt="video" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/assets/headerli.png'
import LiText from '@/assets/litext.png'
import Model7 from '@/assets/li7.png'
import Model8 from '@/assets/li8.png'
import Model9 from '@/assets/li9.png'
import Li9 from '@/assets/Li99.png'
import Market from '@/assets/market.png'
import Market2 from '@/assets/market2.png'
import Video from '@/assets/vid1.png'
import Video2 from '@/assets/vid1.png'
</script>

<style>
@import './index.css';
</style>
