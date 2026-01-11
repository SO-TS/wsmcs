import { createRouter, createWebHistory } from 'vue-router';
import i18n from '../locales/i18n';

// 动态导入页面组件
const HomeView = () => import('../views/Home.vue'); // 主要内容现在在 Home.vue 中
const NotFound = () => import('../views/error/NotFound.vue');
const InternalServerError = () => import('../views/error/InternalServerError.vue');
const ForbiddenError = () => import('../views/error/ForbiddenError.vue');
const UnauthorizedError = () => import('../views/error/UnauthorizedError.vue');
const BadGatewayError = () => import('../views/error/BadGatewayError.vue');
const ServiceUnavailableError = () => import('../views/error/ServiceUnavailableError.vue');

// 语言配置
const supportedLocales = ['zh_CN', 'en'];

// 从URL中提取语言
function getLocaleFromPath(path) {
  const pathParts = path.split('/').filter(part => part !== '');
  if (pathParts.length > 0) {
    // 检查路径的第一部分是否是支持的语言
    if (pathParts[0] === 'zh_CN' || pathParts[0] === 'en') {
      return pathParts[0];
    }
  }
  return null;
}

// 根据路径设置语言
function setLocaleByPath(path) {
  const locale = getLocaleFromPath(path);
  
  if (locale && supportedLocales.includes(locale)) {
    // 如果路径中明确指定了支持的语言，则优先使用路径中的语言
    localStorage.setItem('locale', locale);
    // 确保语言设置正确应用
    if (i18n.global.locale.value !== locale) {
      i18n.global.locale.value = locale;
    }
  } else {
    // 如果路径中没有语言，则使用默认语言或存储的语言
    const targetLocale = localStorage.getItem('locale') || 'zh_CN';
    if (i18n.global.locale.value !== targetLocale) {
      i18n.global.locale.value = targetLocale;
    }
  }
}

// 动态更新hreflang标签
function updateHreflangTags(currentLocale) {
  // 移除现有的hreflang标签
  const existingLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
  existingLinks.forEach(link => link.remove());
  
  // 添加新的hreflang标签
  const locales = {
    'zh-CN': `https://wsmcs.top/zh_CN/`,
    'en': `https://wsmcs.top/en/`,
    'x-default': `https://wsmcs.top/zh_CN/`
  };
  
  for (const [lang, url] of Object.entries(locales)) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = url;
    document.head.appendChild(link);
  }
}

// 路由配置
const routes = [
  // 根路径 - 重定向到默认语言
  {
    path: '/',
    redirect: (to) => {
      // 检查用户浏览器语言偏好
      const browserLang = navigator.language || navigator.languages[0];
      let preferredLocale = 'zh_CN'; // 默认为中文
      
      if (browserLang.startsWith('en')) {
        preferredLocale = 'en';
      } else if (browserLang.startsWith('zh')) {
        preferredLocale = 'zh_CN';
      }
      
      const savedLocale = localStorage.getItem('locale') || preferredLocale;
      return `/${savedLocale}/`;
    }
  },
  // 简体中文路径
  {
    path: '/zh_CN/',
    name: 'HomeZhCN',
    component: HomeView,
    meta: { locale: 'zh_CN' }
  },
  {
    path: '/zh_CN/:pathMatch(.*)*',
    name: 'CatchAllZhCN',
    component: HomeView,
    meta: { locale: 'zh_CN' }
  },
  // 英文路径
  {
    path: '/en/',
    name: 'HomeEn',
    component: HomeView,
    meta: { locale: 'en' }
  },
  {
    path: '/en/:pathMatch(.*)*',
    name: 'CatchAllEn',
    component: HomeView,
    meta: { locale: 'en' }
  },
  // 错误页面路由 - 简体中文
  {
    path: '/zh_CN/404',
    name: 'NotFoundZhCN',
    component: NotFound,
    meta: { locale: 'zh_CN' }
  },
  {
    path: '/zh_CN/500',
    name: 'InternalServerErrorZhCN',
    component: InternalServerError,
    meta: { locale: 'zh_CN' }
  },
  {
    path: '/zh_CN/403',
    name: 'ForbiddenErrorZhCN',
    component: ForbiddenError,
    meta: { locale: 'zh_CN' }
  },
  {
    path: '/zh_CN/401',
    name: 'UnauthorizedErrorZhCN',
    component: UnauthorizedError,
    meta: { locale: 'zh_CN' }
  },
  {
    path: '/zh_CN/502',
    name: 'BadGatewayErrorZhCN',
    component: BadGatewayError,
    meta: { locale: 'zh_CN' }
  },
  {
    path: '/zh_CN/503',
    name: 'ServiceUnavailableErrorZhCN',
    component: ServiceUnavailableError,
    meta: { locale: 'zh_CN' }
  },
  // 错误页面路由 - 英文
  {
    path: '/en/404',
    name: 'NotFoundEn',
    component: NotFound,
    meta: { locale: 'en' }
  },
  {
    path: '/en/500',
    name: 'InternalServerErrorEn',
    component: InternalServerError,
    meta: { locale: 'en' }
  },
  {
    path: '/en/403',
    name: 'ForbiddenErrorEn',
    component: ForbiddenError,
    meta: { locale: 'en' }
  },
  {
    path: '/en/401',
    name: 'UnauthorizedErrorEn',
    component: UnauthorizedError,
    meta: { locale: 'en' }
  },
  {
    path: '/en/502',
    name: 'BadGatewayErrorEn',
    component: BadGatewayError,
    meta: { locale: 'en' }
  },
  {
    path: '/en/503',
    name: 'ServiceUnavailableErrorEn',
    component: ServiceUnavailableError,
    meta: { locale: 'en' }
  },
  // 通配符路由 - 用于处理其他路径并尝试检测语言
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    beforeEnter: (to, from, next) => {
      // 检测路径中的语言并设置
      setLocaleByPath(to.path);
      next();
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，滚动到保存的位置
    if (savedPosition) {
      return savedPosition;
    }
    // 如果有锚点，滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    // 默认滚动到顶部
    return { top: 0 };
  }
});

// 路由守卫：在路由变化时检测并设置语言
router.beforeEach((to, from, next) => {
  // 检测路径中的语言并设置
  setLocaleByPath(to.path);
  
  // 更新hreflang标签
  updateHreflangTags(i18n.global.locale.value);
  
  next();
});

export { router, i18n, supportedLocales };