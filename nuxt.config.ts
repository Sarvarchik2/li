//
// export default defineNuxtConfig({
//   modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxtjs/sitemap'],
//   sitemap: {
//     hostname: 'https://lixiang-uzbekistan.uz',
//     gzip: true,
//     routes: async () => {
//
//       const res = await fetch('https://api.lixiang-uzbekistan.uz/available-cars/');
//       const cars = await res.json();
//
//       return cars.map((car: { id: number }) => `/carinstockmore?id=${car.id}`);
//     }
//   },
//   i18n: {
//     legacy: false,
//     lazy: true,
//     strategy: 'prefix',
//     defaultLocale: 'uz',
//     langDir: 'locales',
//     detectBrowserLanguage: {
//       useCookie: true,
//       cookieKey: 'i18n_redirected',
//       fallbackLocale: 'uz'
//     },
//     locales: [
//       { code: 'uz', name: 'O‘zbekcha', file: 'uz.json' },
//       { code: 'ru', name: 'Русский', file: 'ru.json' },
//       { code: 'en', name: 'English', file: 'en.json' }
//     ]
//   }
// })

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxtjs/sitemap'],

  sitemap: {
    hostname: 'https://lixiang-uzbekistan.uz',
    gzip: true,
    routes: async () => {
      const staticRoutes = ['/', '/models', '/market', '/contact']

      // 1. Страницы моделей
      const modelsRes = await fetch('https://api.lixiang-uzbekistan.uz/api/models/')
      const models = await modelsRes.json()
      const modelRoutes = models
          .filter((m: any) => m.is_available)
          .map((m: any) => `/model-more?id=${m.id}`)

      // 2. Страницы товаров
      const productsRes = await fetch('https://api.lixiang-uzbekistan.uz/api/market-models/')
      const products = await productsRes.json()
      const productRoutes = products.map((p: any) => `/productmore?id=${p.id}`)

      // 3. Страницы авто в наличии
      const carsRes = await fetch('https://api.lixiang-uzbekistan.uz/available-cars/')
      const cars = await carsRes.json()
      const carRoutes = cars.map((car: any) => `/carinstockmore?id=${car.id}`)

      return [
        ...staticRoutes,
        ...modelRoutes,
        ...productRoutes,
        ...carRoutes
      ]
    }
  },

  i18n: {
    legacy: false,
    lazy: true,
    strategy: 'prefix',
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
