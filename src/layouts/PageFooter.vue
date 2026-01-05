<script setup>
/**
 * @file PageFooter.vue
 * @description Global footer component with brand information, navigation links, and copyright details.
 */

import { useI18n } from 'vue-i18n';
import logoUrl from '@/assets/wsmcs-logo.webp'
import IconBilibili from "@/components/common/IconBilibili.vue";
import IconYoutube from "@/components/common/IconYoutube.vue";
import IconKoolepa from "@/components/common/IconKoolepa.vue";
import IconCommunity from "@/components/common/IconCommunity.vue";
import IconDocumentation from "@/components/common/IconDocumentation.vue";
import IconSupport from "@/components/common/IconSupport.vue";

const { t } = useI18n();
</script>

<template>
  <!-- Footer container -->
  <footer class="py-16 text-sm">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Footer Grid: Brand, Services, Docs, Links -->
      <div class="grid grid-cols-1 md:grid-cols-6 gap-8 mb-10"> <!-- Changed to 6 columns -->
        <!-- Brand Information -->
        <div class="md:col-span-3"> <!-- Brand info now takes 3 columns -->
          <div class="font-bold text-lg mb-4 flex items-center footer-logo-text">
            <img :src="logoUrl" alt="WSMCS Logo" class="w-6 h-6 mr-2 object-contain aspect-square block" />
            {{ t('footer.brand_name') }}
          </div>
          <p class="mb-5 max-w-xs footer-desc-text">{{ t('footer.brand_desc') }}</p>
        </div>
        <!-- Services Column -->
        <div class="footer-col">
          <h4 class="mb-5 font-semibold footer-col-title">{{ t('footer.service_title') }}</h4>
          <ul>
            <li class="mb-3"><a href="#" class="transition-colors duration-300 ease-in-out footer-link">{{ t('footer.service_1') }}</a></li>
            <li class="mb-3"><a href="https://status.wsmcs.top" class="transition-colors duration-300 ease-in-out footer-link">{{ t('footer.service_2') }}</a></li>
          </ul>
        </div>
        <!-- Documentation Column -->
        <div class="footer-col">
          <h4 class="mb-5 font-semibold footer-col-title">{{ t('footer.docs_title') }}</h4>
          <ul>
            <li class="mb-3"><a href="https://docs.wsmcs.top" class="transition-colors duration-300 ease-in-out footer-link">{{ t('footer.docs_1') }}</a></li>
            <li class="mb-3"><a href="#" class="transition-colors duration-300 ease-in-out footer-link">{{ t('footer.docs_2') }}</a></li>
            <li class="mb-3"><a href="#" class="transition-colors duration-300 ease-in-out footer-link">{{ t('footer.docs_3') }}</a></li>
            </ul>
        </div>
        <!-- Links Column -->
        <div class="footer-col">
          <h4 class="mb-5 font-semibold footer-col-title">{{ t('footer.links_title') }}</h4>
          <ul>
            <li class="mb-3"><a href="#" class="transition-colors duration-300 ease-in-out footer-link">{{ t('footer.links_1') }}</a></li>
            <li class="mb-3"><a href="#" class="transition-colors duration-300 ease-in-out footer-link">{{ t('footer.links_2') }}</a></li>
          </ul>
        </div>
      </div>
      <!-- Copyright and Social Icons -->
      <div class="pt-5 flex flex-col md:flex-row justify-between items-center text-xs footer-copyright">
        <span>{{ t('footer.copyright') }}</span>
        <div class="social-icons mt-3 md:mt-0 flex items-center">
          <!-- TODO: Replace the link -->
          <a href="YOUR_KOOLIEPA_FORUM_LINK" target="_blank" class="ml-4 transition-colors duration-300 ease-in-out footer-social-icon">
            <IconKoolepa class="w-6 h-6"/>
          </a>
          <a href="YOUR_BILIBILI_LINK" target="_blank" class="ml-4 transition-colors duration-300 ease-in-out footer-social-icon">
            <IconBilibili class="w-6 h-6"/>
          </a>
          <a href="YOUR_YOUTUBE_LINK" target="_blank" class="ml-4 transition-colors duration-300 ease-in-out footer-social-icon">
            <IconYoutube class="w-7 h-6"/>
          </a>
          <a href="#" target="_blank" class="ml-4 transition-colors duration-300 ease-in-out footer-social-icon">
            <IconCommunity class="w-6 h-6"/>
          </a>
          <a href="#" target="_blank" class="ml-4 transition-colors duration-300 ease-in-out footer-social-icon">
            <IconDocumentation class="w-6 h-6"/>
          </a>
          <a href="#" target="_blank" class="ml-4 transition-colors duration-300 ease-in-out footer-social-icon">
            <IconSupport class="w-6 h-6"/>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--footer-bg);
}

.footer-logo-text {
  color: var(--primary-blue);
}

.footer-desc-text {
  color: var(--footer-text);
}

.footer-col-title {
  color: var(--text-main);
}

.footer-link {
  color: var(--footer-text);
}

.footer-link:hover {
  color: var(--footer-link-hover);
}

.footer-copyright {
  /* border-top has been removed */
  color: var(--footer-text);
}

.footer-social-icon {
  color: var(--footer-social-icon);
}

.footer-social-icon:hover {
  color: var(--footer-social-icon-hover);
}


</style>
