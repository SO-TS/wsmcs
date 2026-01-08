import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// SEO标签缓存
const metaCache = {
  description: null,
  ogTitle: null,
  ogDescription: null,
  ogUrl: null,
  ogImage: null,
  twitterTitle: null,
  twitterDescription: null,
  twitterImage: null,
  canonical: null,
  initialized: false
};

/**
 * 初始化meta标签缓存（一次性操作）
 */
function initializeMetaCache() {
  if (metaCache.initialized) return;
  
  metaCache.description = document.querySelector('meta[name="description"]');
  metaCache.ogTitle = document.querySelector('meta[property="og:title"]');
  metaCache.ogDescription = document.querySelector('meta[property="og:description"]');
  metaCache.ogUrl = document.querySelector('meta[property="og:url"]');
  metaCache.ogImage = document.querySelector('meta[property="og:image"]');
  metaCache.twitterTitle = document.querySelector('meta[name="twitter:title"]');
  metaCache.twitterDescription = document.querySelector('meta[name="twitter:description"]');
  metaCache.twitterImage = document.querySelector('meta[name="twitter:image"]');
  
  // 检查是否存在canonical标签，如不存在则创建
  metaCache.canonical = document.querySelector('link[rel="canonical"]');
  if (!metaCache.canonical) {
    metaCache.canonical = document.createElement('link');
    metaCache.canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(metaCache.canonical);
  }
  
  metaCache.initialized = true;
}

/**
 * 更新SEO元标签
 * @param {Object} seoData - 包含页面SEO信息的对象
 * @param {string} seoData.title - 页面标题
 * @param {string} seoData.description - 页面描述
 * @param {string} seoData.url - 页面URL
 * @param {string} seoData.image - 页面图片
 */
export function updateSEO(seoData) {
  // 初始化缓存
  initializeMetaCache();
  
  const {
    title,
    description,
    url,
    image
  } = seoData;
  
  // 更新页面标题
  if (title) {
    document.title = title;
  }
  
  // 更新meta描述
  if (metaCache.description && description) {
    metaCache.description.setAttribute('content', description);
  }
  
  // 批量更新Open Graph标签
  if (metaCache.ogTitle && title) {
    metaCache.ogTitle.setAttribute('content', title);
  }
  
  if (metaCache.ogDescription && description) {
    metaCache.ogDescription.setAttribute('content', description);
  }
  
  if (metaCache.ogUrl && url) {
    metaCache.ogUrl.setAttribute('content', url);
  }
  
  if (metaCache.ogImage && image) {
    metaCache.ogImage.setAttribute('content', image);
  }
  
  // 批量更新Twitter Card标签
  if (metaCache.twitterTitle && title) {
    metaCache.twitterTitle.setAttribute('content', title);
  }
  
  if (metaCache.twitterDescription && description) {
    metaCache.twitterDescription.setAttribute('content', description);
  }
  
  if (metaCache.twitterImage && image) {
    metaCache.twitterImage.setAttribute('content', image);
  }
  
  // 更新canonical URL
  if (metaCache.canonical && url) {
    metaCache.canonical.setAttribute('href', url);
  }
}

/**
 * 根据路由名称获取SEO数据
 * @param {string} routeName - 路由名称
 * @param {Function} t - i18n翻译函数
 * @returns {Object} SEO数据对象
 */
export function getSEODataByRoute(routeName, t, currentLocale) {
  const baseUrl = 'https://wsmcs.top';
  const defaultImage = 'https://wsmcs.top/images/hero-bg.webp';
  
  const seoMap = {
    // 首页
    'HomeZhCN': {
      title: t('hero.title') + ' - WSMCS',
      description: t('hero.subtitle').replace(/\n/g, ' '),
      url: `${baseUrl}/zh_CN/`,
      image: defaultImage
    },
    'HomeEn': {
      title: t('hero.title') + ' - WSMCS',
      description: t('hero.subtitle').replace(/\n/g, ' '),
      url: `${baseUrl}/en/`,
      image: defaultImage
    },
    
    // 特性页面
    'FeaturesZhCN': {
      title: t('features.title') + ' - 繁星之望',
      description: t('features.desc').replace(/\n/g, ' '),
      url: `${baseUrl}/zh_CN/#features`,
      image: defaultImage
    },
    'FeaturesEn': {
      title: t('features.title') + ' - Star Wish Server',
      description: t('features.desc').replace(/\n/g, ' '),
      url: `${baseUrl}/en/#features`,
      image: defaultImage
    },
    
    // 团队页面
    'TeamZhCN': {
      title: t('team.title') + ' - 繁星之望',
      description: t('team.desc').replace(/\n/g, ' '),
      url: `${baseUrl}/zh_CN/#team`,
      image: defaultImage
    },
    'TeamEn': {
      title: t('team.title') + ' - Star Wish Server',
      description: t('team.desc').replace(/\n/g, ' '),
      url: `${baseUrl}/en/#team`,
      image: defaultImage
    },
    
    // CTA页面
    'CTAZhCN': {
      title: t('cta.title') + ' - 繁星之望',
      description: t('cta.title') + ' - ' + t('cta.version'),
      url: `${baseUrl}/zh_CN/#cta`,
      image: defaultImage
    },
    'CTAEn': {
      title: t('cta.title') + ' - Star Wish Server',
      description: t('cta.title') + ' - ' + t('cta.version'),
      url: `${baseUrl}/en/#cta`,
      image: defaultImage
    },
    
    // 错误页面
    'NotFoundZhCN': {
      title: t('error.notFoundTitle') + ' - 繁星之望',
      description: t('error.notFoundMessage'),
      url: `${baseUrl}/zh_CN/404`,
      image: defaultImage
    },
    'NotFoundEn': {
      title: t('error.notFoundTitle') + ' - Star Wish Server',
      description: t('error.notFoundMessage'),
      url: `${baseUrl}/en/404`,
      image: defaultImage
    },
    'InternalServerErrorZhCN': {
      title: t('error.internalErrorTitle') + ' - 繁星之望',
      description: t('error.internalErrorMessage'),
      url: `${baseUrl}/zh_CN/500`,
      image: defaultImage
    },
    'InternalServerErrorEn': {
      title: t('error.internalErrorTitle') + ' - Star Wish Server',
      description: t('error.internalErrorMessage'),
      url: `${baseUrl}/en/500`,
      image: defaultImage
    },
    'ForbiddenErrorZhCN': {
      title: t('error.forbiddenTitle') + ' - 繁星之望',
      description: t('error.forbiddenMessage'),
      url: `${baseUrl}/zh_CN/403`,
      image: defaultImage
    },
    'ForbiddenErrorEn': {
      title: t('error.forbiddenTitle') + ' - Star Wish Server',
      description: t('error.forbiddenMessage'),
      url: `${baseUrl}/en/403`,
      image: defaultImage
    },
    'UnauthorizedErrorZhCN': {
      title: t('error.unauthorizedTitle') + ' - 繁星之望',
      description: t('error.unauthorizedMessage'),
      url: `${baseUrl}/zh_CN/401`,
      image: defaultImage
    },
    'UnauthorizedErrorEn': {
      title: t('error.unauthorizedTitle') + ' - Star Wish Server',
      description: t('error.unauthorizedMessage'),
      url: `${baseUrl}/en/401`,
      image: defaultImage
    },
    'BadGatewayErrorZhCN': {
      title: t('error.badGatewayTitle') + ' - 繁星之望',
      description: t('error.badGatewayMessage'),
      url: `${baseUrl}/zh_CN/502`,
      image: defaultImage
    },
    'BadGatewayErrorEn': {
      title: t('error.badGatewayTitle') + ' - Star Wish Server',
      description: t('error.badGatewayMessage'),
      url: `${baseUrl}/en/502`,
      image: defaultImage
    },
    'ServiceUnavailableErrorZhCN': {
      title: t('error.serviceUnavailableTitle') + ' - 繁星之望',
      description: t('error.serviceUnavailableMessage'),
      url: `${baseUrl}/zh_CN/503`,
      image: defaultImage
    },
    'ServiceUnavailableErrorEn': {
      title: t('error.serviceUnavailableTitle') + ' - Star Wish Server',
      description: t('error.serviceUnavailableMessage'),
      url: `${baseUrl}/en/503`,
      image: defaultImage
    }
  };
  
  // 获取默认SEO数据
  const defaultSEO = {
    title: t('hero.title') + ' - WSMCS',
    description: t('hero.subtitle').replace(/\n/g, ' '),
    url: baseUrl + (currentLocale ? `/${currentLocale}/` : '/zh_CN/'),
    image: defaultImage
  };
  
  return seoMap[routeName] || defaultSEO;
}

/**
 * Vue 3 Composable 函数，用于管理SEO
 */
export function useSEO() {
  const { t, locale } = useI18n();
  
  /**
   * 设置页面SEO
   * @param {Object} seoData - SEO数据
   * @param {string} routeName - 路由名称（可选，用于获取默认SEO数据）
   */
  const setSEO = (seoData, routeName = null) => {
    if (routeName && !seoData) {
      seoData = getSEODataByRoute(routeName, t, locale.value);
    }
    
    updateSEO(seoData || {
      title: t('hero.title') + ' - WSMCS',
      description: t('hero.subtitle').replace(/\n/g, ' '),
      url: 'https://wsmcs.top/' + (locale.value || 'zh_CN') + '/',
      image: 'https://wsmcs.top/images/hero-bg.webp'
    });
  };
  
  /**
   * 设置默认首页SEO
   */
  const setDefaultSEO = () => {
    setSEO(null, `Home${locale.value === 'en' ? 'En' : 'ZhCN'}`);
  };
  
  return {
    setSEO,
    setDefaultSEO,
    updateSEO,
    getSEODataByRoute
  };
}
