
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  i18n: {
    legacy: false,
    lazy: true,
    strategy: 'prefix', // язык в URL обязательно
    defaultLocale: 'uz',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'uz'
    },
    locales: [
      { code: 'uz', name: 'O‘zbekcha', file: 'uz.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  }
})
