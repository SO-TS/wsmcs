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
const supportedLocales = ['zh', 'en'];

// 从URL中提取语言
function getLocaleFromPath(path) {
  const pathParts = path.split('/').filter(part => part !== '');
  if (pathParts.length > 0 && supportedLocales.includes(pathParts[0])) {
    return pathParts[0];
  }
  return null;
}

// 根据路径设置语言
function setLocaleByPath(path) {
  const locale = getLocaleFromPath(path);
  if (locale && supportedLocales.includes(locale)) {
    i18n.global.locale = locale;
    // 保存到本地存储
    localStorage.setItem('locale', locale);
  } else {
    // 如果路径中没有语言，则使用默认语言或存储的语言
    const savedLocale = localStorage.getItem('locale') || 'zh';
    i18n.global.locale = savedLocale;
  }
}

// 路由配置
const routes = [
  // 根路径 - 重定向到默认语言
  {
    path: '/',
    redirect: (to) => {
      const savedLocale = localStorage.getItem('locale') || 'zh';
      return `/${savedLocale}/`;
    }
  },
  // 中文路径
  {
    path: '/zh/',
    name: 'HomeZh',
    component: HomeView,
    meta: { locale: 'zh' }
  },
  {
    path: '/zh/:pathMatch(.*)*',
    name: 'CatchAllZh',
    component: HomeView,
    meta: { locale: 'zh' }
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
  // 错误页面路由 - 中文
  {
    path: '/zh/404',
    name: 'NotFoundZh',
    component: NotFound,
    meta: { locale: 'zh' }
  },
  {
    path: '/zh/500',
    name: 'InternalServerErrorZh',
    component: InternalServerError,
    meta: { locale: 'zh' }
  },
  {
    path: '/zh/403',
    name: 'ForbiddenErrorZh',
    component: ForbiddenError,
    meta: { locale: 'zh' }
  },
  {
    path: '/zh/401',
    name: 'UnauthorizedErrorZh',
    component: UnauthorizedError,
    meta: { locale: 'zh' }
  },
  {
    path: '/zh/502',
    name: 'BadGatewayErrorZh',
    component: BadGatewayError,
    meta: { locale: 'zh' }
  },
  {
    path: '/zh/503',
    name: 'ServiceUnavailableErrorZh',
    component: ServiceUnavailableError,
    meta: { locale: 'zh' }
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
  next();
});

export { router, i18n, supportedLocales };