<template>
  <div class="contact">
    <div class="main-content-contact">
      <h3>{{ $t('main.contact') }}</h3>
      <div class="main-content-contact-wrapper">
        <div class="main-content-contact-left">
          <h4>{{ $t('main.branches') }}</h4>
          <button>Toshkent</button>
          <h4>{{ $t('main.address') }}</h4>
          <p>Малая кольцевая дорога 4/1 блок 4</p>
          <div class="main-content-contact-left-info">
            <div class="main-content-contact-left-info-item">
              <h4>{{ $t('main.phone') }}</h4>
              <NuxtLink>+998 (77) 343 99 99</NuxtLink>
              <NuxtLink>+998 (20) 009 05 55</NuxtLink>
            </div>
            <div class="main-content-contact-left-info-item">
              <h4>{{ $t('main.worktime') }}</h4>
              <NuxtLink>{{ $t('main.weekdays') }}</NuxtLink>
<!--              <NuxtLink>{{ $t('main.weekends') }}</NuxtLink>-->
            </div>
          </div>
        </div>
        <div class="main-content-contact-right">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.135533100059!2d69.31460419999999!3d41.3276661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5bd2c77a2f9%3A0x9328b277ea123405!2zNC8xINCx0LvQvtC6IDQ!5e0!3m2!1sru!2s!4v1747893666524!5m2!1sru!2s"  style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <form class="contact-content" @submit.prevent="submitForm">
        <div class="contact-content-left">
          <input
              v-model="form.name"
              :placeholder="$t('form.first_name')"
              type="text"
              required
          />
          <input
              v-model="form.last_name"
              :placeholder="$t('form.last_name')"
              type="text"
          />
          <input
              v-model="form.phone_number"
              :placeholder="$t('form.phone')"
              type="tel"
              required
          />
        </div>
        <textarea
            v-model="form.message"
            class="contact-content-right"
            :placeholder="$t('form.comment')"
            required
        ></textarea>
        <button type="submit">{{ $t('form.submit') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHead, useI18n } from '#imports'
const { t, locale } = useI18n()
const form = ref({
  name: '',
  last_name: '',
  phone_number: '',
  message: '',
  sent_to_telegram: true
})
useHead(() => ({
  title: t('seo.contact.title') || 'Контакты YasAuto — официальный дилер Lixiang',
  meta: [
    { name: 'description', content: t('seo.contact.description') || 'Свяжитесь с YasAuto для покупки Lixiang в Узбекистане. Мы находимся в Ташкенте, звоните +998 (77) 343 99 99' },
    { name: 'keywords', content: t('seo.contact.keywords') || 'контакты, yasauto, lixiang, ташкент, автосалон, дилер' },
    { property: 'og:title', content: t('seo.contact.og_title') || 'Контакты YasAuto' },
    { property: 'og:description', content: t('seo.contact.og_description') || 'Адрес и контакты YasAuto — официальный дилер Lixiang в Узбекистане' },
    { property: 'og:image', content: 'https://lixiang-uzbekistan.uz/logoblack.png' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://lixiang-uzbekistan.uz${locale.value !== 'ru' ? '/' + locale.value : ''}/contact`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "YasAuto",
        "url": "https://lixiang-uzbekistan.uz",
        "logo": "https://lixiang-uzbekistan.uz/logoblack.png",
        "description": "Официальный дилер Lixiang в Узбекистане. Продажа Li9, Li7, Li6, запчасти и обслуживание.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Малая кольцевая дорога 4/1 блок 4",
          "addressLocality": "Ташкент",
          "addressCountry": "UZ"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+998773439999",
          "contactType": "customer service",
          "areaServed": "UZ"
        },
        "sameAs": [
          "https://www.instagram.com/_yas_auto_/",
          "https://t.me/yas_auto"
        ]
      })
    }
  ]
}))

const submitForm = async () => {
  try {

    const loader = Swal.fire({
      title: 'Отправка...',
      text: 'Пожалуйста, подождите.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const response = await axios.post(
        'https://api.lixiang-uzbekistan.uz/api/contact/',
        form.value,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 секунд, чтобы не висело вечно
        }
    )


    await Swal.fire({
      icon: 'success',
      title: 'Успешно!',
      text: 'Спасибо за ваше сообщение!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ок'
    })

    form.value = {
      name: '',
      last_name: '',
      phone_number: '',
      message: '',
      sent_to_telegram: true
    }

  } catch (error) {
    console.error('❌ Ошибка при отправке:', error)

    await Swal.fire({
      icon: 'error',
      title: 'Ошибка!',
      text: error?.response?.data?.message || 'Не удалось отправить. Проверьте подключение или данные.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Понял'
    })
  }
}

</script>

<style scoped>
@import "./contact.css";

.contact {
  width: 100%;
}

.main-content-contact {
  margin-top: 20px;
}
</style>
