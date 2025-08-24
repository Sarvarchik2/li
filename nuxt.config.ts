// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxtjs/sitemap'],

  // ↓ если хочешь переиспользовать baseUrl в коде
  runtimeConfig: {
    public: {
      baseUrl: process.env.PUBLIC_BASE_URL || 'https://lixiang-uzbekistan.uz'
    }
  },

  // ─────────────────────────────────────────────────────────
  // SITEMAP (@nuxtjs/sitemap)
  // ─────────────────────────────────────────────────────────
  sitemap: {
    // для новых версий модуля используется siteUrl; оставлю и hostname на всякий
    siteUrl: 'https://lixiang-uzbekistan.uz',
    hostname: 'https://lixiang-uzbekistan.uz',
    gzip: true,

    // генерим все маршруты локализованно для uz/ru/en
    routes: async () => {
      const LOCALES = ['uz', 'ru', 'en'];

      const withLocales = (paths: string[]) =>
          LOCALES.flatMap((code) =>
              paths.map((p) => `/${code}${p.startsWith('/') ? p : `/${p}`}`.replace(/\/+$/, ''))
          );

      // 0) статические страницы (добавил /carsinstock)
      const staticBase = ['', '/models', '/market', '/contact', '/carsinstock'];
      const staticRoutes = withLocales(staticBase);

      // 1) модели (оставляю твой текущий формат с query)
      let modelRoutes: string[] = [];
      try {
        const res = await fetch('https://api.lixiang-uzbekistan.uz/api/models/');
        const models = await res.json();
        const ids = (models || [])
            .filter((m: any) => m?.is_available)
            .map((m: any) => `/model-more?id=${m.id}`);
        modelRoutes = withLocales(ids);
      } catch {
        modelRoutes = [];
      }

      // 2) товары (если у тебя slug — замени на `/product/${p.slug}`)
      let productRoutes: string[] = [];
      try {
        const res = await fetch('https://api.lixiang-uzbekistan.uz/api/market-models/');
        const products = await res.json();
        const ids = (products || []).map((p: any) => `/product/${p.id}`);
        productRoutes = withLocales(ids);
      } catch {
        productRoutes = [];
      }

      // 3) авто в наличии (исправлено: правильный ендпоинт с /api/)
      let carRoutes: string[] = [];
      try {
        const res = await fetch('https://api.lixiang-uzbekistan.uz/api/available-cars/');
        const cars = await res.json();
        // новый «чистый» путь без query:
        const ids = (cars || []).map((c: any) => `/carinstockmore/${c.id}`);
        carRoutes = withLocales(ids);
      } catch {
        carRoutes = [];
      }

      return [...staticRoutes, ...modelRoutes, ...productRoutes, ...carRoutes];
    }
  },

  // ─────────────────────────────────────────────────────────
  // I18N
  // ─────────────────────────────────────────────────────────
  i18n: {
    legacy: false,
    lazy: true,
    strategy: 'prefix',           // для всех локалей будет префикс: /uz, /ru, /en
    defaultLocale: 'uz',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'uz'
    },
    locales: [
      { code: 'uz', name: 'O‘zbekcha', file: 'uz.json' },
      { code: 'ru', name: 'Русский',  file: 'ru.json' },
      { code: 'en', name: 'English',  file: 'en.json' }
    ]
  }
});
