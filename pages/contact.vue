<template>
  <div class="contact" :key="locale">
    <div class="main-content-contact">
      <h3>{{ $t('main.contact') }}</h3>

      <div class="main-content-contact-wrapper">
        <div class="main-content-contact-left">
          <h4>{{ $t('main.branches') }}</h4>
          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button 
              type="button" 
              :aria-pressed="activeBranch === 'yunusabad'"
              @click="activeBranch = 'yunusabad'"
              :style="{ background: activeBranch === 'yunusabad' ? '#000' : '#ddd', color: activeBranch === 'yunusabad' ? '#fff' : '#000', padding: '10px 20px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: '500' }"
            >
              {{ $t('main.branch_yunusabad') }}
            </button>
            <button 
              type="button" 
              :aria-pressed="activeBranch === 'sergeli'"
              @click="activeBranch = 'sergeli'"
              :style="{ background: activeBranch === 'sergeli' ? '#000' : '#ddd', color: activeBranch === 'sergeli' ? '#fff' : '#000', padding: '10px 20px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: '500' }"
            >
              {{ $t('main.branch_sergeli') }}
            </button>
          </div>

          <h4>{{ $t('main.address') }}</h4>
          <p>{{ activeBranch === 'yunusabad' ? $t('main.address_yunusabad') : $t('main.address_sergeli') }}</p>

          <div class="main-content-contact-left-info">
            <div class="main-content-contact-left-info-item">
              <h4>{{ $t('main.phone') }}</h4>
              <!-- тел ссылки вместо NuxtLink без to -->
              <a href="tel:+998773439999">+998 (77) 343 99 99</a>
              <a href="tel:+998200090555">+998 (20) 009 05 55</a>
            </div>
            <div class="main-content-contact-left-info-item">
              <h4>{{ $t('main.worktime') }}</h4>
              <span>{{ $t('main.weekdays') }}</span>
            </div>
          </div>
        </div>

        <div class="main-content-contact-right">
          <iframe
              v-if="activeBranch === 'yunusabad'"
              title="Карта офиса YasAuto в Юнусабаде"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.135533100059!2d69.31460419999999!3d41.3276661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5bd2c77a2f9%3A0x9328b277ea123405!2zNC8xINCx0LvQvtC6IDQ!5e0!3m2!1sru!2s!4v1747893666524!5m2!1sru!2s"
              style="border:0;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
          ></iframe>
          <iframe
              v-else
              title="Карта офиса YasAuto в Сергели"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.8!2d69.2294194!3d41.2434444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE0JzM2LjQiTiA2OcKwMTMnNDYuMSJF!5e0!3m2!1sru!2s!4v1000000000000!5m2!1sru!2s"
              style="border:0;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
          ></iframe>
        </div>
      </div>

      <form class="contact-content" @submit.prevent="submitForm" novalidate>
        <!-- anti-spam honeypot -->
        <input
            v-model="form.honey"
            class="hp"
            type="text"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
        />

        <div class="contact-content-left">
          <input
              v-model.trim="form.name"
              :placeholder="$t('form.first_name')"
              name="first_name"
              type="text"
              required
              autocomplete="given-name"
              :aria-invalid="!form.name && triedSubmit"
          />
          <input
              v-model.trim="form.last_name"
              :placeholder="$t('form.last_name')"
              name="last_name"
              type="text"
              autocomplete="family-name"
          />
          <input
              v-model.trim="form.phone_number"
              :placeholder="$t('form.phone')"
              name="phone"
              type="tel"
              inputmode="tel"
              :pattern="uzPhonePattern"
              required
              autocomplete="tel"
              :aria-invalid="!isPhoneValid && triedSubmit"
          />
        </div>

        <textarea
            v-model.trim="form.message"
            class="contact-content-right"
            :placeholder="$t('form.comment')"
            name="message"
            required
            rows="6"
            :aria-invalid="!form.message && triedSubmit"
        ></textarea>

        <label class="consent">
          <input type="checkbox" v-model="form.consent" />
          <span>{{ $t('form.consent') || 'Я согласен(на) на обработку персональных данных' }}</span>
        </label>

        <div class="actions">
          <button type="submit" :disabled="!canSubmit || isSubmitting">
            {{ isSubmitting ? $t('form.sending') || 'Отправка…' : $t('form.submit') }}
          </button>
          <span class="sr-only" role="status" aria-live="polite">
            {{ statusText }}
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useHead, useI18n } from '#imports'

const { t, locale } = useI18n()

const activeBranch = ref<'yunusabad' | 'sergeli'>('yunusabad')

const form = ref({
  name: '',
  last_name: '',
  phone_number: '',
  message: '',
  sent_to_telegram: true,
  consent: false,
  honey: '' // honeypot
})
const isSubmitting = ref(false)
const triedSubmit = ref(false)
const statusText = ref('')

/** узбекский номер вида +998 (..) ... .. ..  */
const uzPhonePattern = '^\\+?998[\\s\\-\\(\\)]?\\d{2}[\\s\\-\\)]?\\d{3}[\\s\\-]?\\d{2}[\\s\\-]?\\d{2}$'
const isPhoneValid = computed(() => new RegExp(uzPhonePattern).test(form.value.phone_number))

const canSubmit = computed(() =>
    !!form.value.name &&
    !!form.value.phone_number &&
    !!form.value.message &&
    isPhoneValid.value &&
    form.value.consent &&
    !form.value.honey // бот заполнил honeypot → блок
)

watch(() => locale.value, () => {
  // на всякий случай обнулим тексты статуса при смене языка
  statusText.value = ''
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
        "@type": "ContactPage",
        "name": "YasAuto — Контакты",
        "inLanguage": locale.value,
        "about": {
          "@type": "Organization",
          "name": "YasAuto",
          "url": "https://lixiang-uzbekistan.uz",
          "logo": "https://lixiang-uzbekistan.uz/logoblack.png",
          "description": "Официальный дилер Lixiang в Узбекистане. Продажа Li9, Li7, Li6, запчасти и обслуживание.",
          "address": [
            {
              "@type": "PostalAddress",
              "streetAddress": "Малая кольцевая дорога 4/1 блок 4",
              "addressLocality": "Ташкент, Юнусабадский район",
              "addressCountry": "UZ"
            },
            {
              "@type": "PostalAddress",
              "streetAddress": "Сход граждан Кут-Барака",
              "addressLocality": "Ташкент, Сергелийский район",
              "addressCountry": "UZ"
            }
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+998773439999",
            "contactType": "customer service",
            "areaServed": "UZ",
            "availableLanguage": ["ru","uz","en"]
          },
          "sameAs": [
            "https://www.instagram.com/_yas_auto_/",
            "https://t.me/yas_auto"
          ]
        }
      })
    }
  ]
}))

// hreflang (если @nuxtjs/i18n подключён)
const localeHead = useLocaleHead?.({ addSeoAttributes: true })
useHead({
  link: [...(localeHead?.value?.link || [])],
  htmlAttrs: localeHead?.value?.htmlAttrs
})

const submitForm = async () => {
  triedSubmit.value = true
  statusText.value = ''
  if (!canSubmit.value || isSubmitting.value) return

  isSubmitting.value = true
  try {
    // lazy-импорт SweetAlert2 только на клиенте
    const { default: Swal } = await import('sweetalert2')

    const loader = Swal.fire({
      title: t('form.sending') || 'Отправка…',
      text: t('form.please_wait') || 'Пожалуйста, подождите.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    })

    await axios.post(
        'https://api.lixiang-uzbekistan.uz/api/contact/',
        {
          name: form.value.name,
          last_name: form.value.last_name,
          phone_number: form.value.phone_number,
          message: form.value.message,
          sent_to_telegram: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': locale.value
          },
          timeout: 10000
        }
    )

    await Swal.fire({
      icon: 'success',
      title: t('form.success_title') || 'Успешно!',
      text: t('form.success_text') || 'Спасибо за ваше сообщение!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: t('form.ok') || 'Ок'
    })

    // reset
    form.value = {
      name: '',
      last_name: '',
      phone_number: '',
      message: '',
      sent_to_telegram: true,
      consent: false,
      honey: ''
    }
    triedSubmit.value = false
    statusText.value = t('form.sent') || 'Отправлено'
  } catch (error: any) {
    console.error('❌ Ошибка при отправке:', error)
    const { default: Swal } = await import('sweetalert2')
    await Swal.fire({
      icon: 'error',
      title: t('form.error_title') || 'Ошибка!',
      text: error?.response?.data?.message || t('form.error_text') || 'Не удалось отправить. Проверьте подключение или данные.',
      confirmButtonColor: '#d33',
      confirmButtonText: t('form.ok') || 'Понял'
    })
    statusText.value = t('form.error_text') || 'Ошибка отправки'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@import "./contact.css";

.contact { width: 100%; }
.main-content-contact { margin-top: 20px; }

/* скрытый honeypot */
.hp {
  position: absolute !important;
  left: -10000px !important;
  top: auto !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}

/* согласие */
.consent {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
  font-size: 14px;
}

/* действия/кнопка */
.actions { display: flex; align-items: center; gap: 12px; }
button[disabled] { opacity: .6; cursor: not-allowed; }

/* для screen reader */
.sr-only {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden; clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; border: 0; padding: 0; margin: -1px;
}
</style>
