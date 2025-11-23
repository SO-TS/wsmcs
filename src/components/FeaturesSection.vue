<script setup>
/**
 * @file FeaturesSection.vue
 * @description Displays a section highlighting key features with an interactive accordion-style layout.
 * Cards are narrow by default and expand horizontally on hover, with the first card expanded by default.
 */

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { IMAGES } from '../config/images';

const { t } = useI18n();

/**
 * Reactive state to track the index of the currently expanded feature card.
 * Defaults to 0, so the first card is expanded on load.
 * @type {import('vue').Ref<number>}
 */
const expandedCardIndex = ref(0);

/**
 * Sets the expanded card index when the mouse enters a card.
 * @param {number} index - The index of the card to expand.
 */
function expandCard(index) {
  expandedCardIndex.value = index;
}

/**
 * Resets the expanded card index to 0 (first card) when the mouse leaves the accordion container.
 */
function resetExpandedCard() {
  expandedCardIndex.value = 0;
}
</script>

<template>
  <!-- Features Section container -->
  <section class="py-20 fade-in-up"> <!-- Added fade-in-up class for entry animation -->
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-10 section-header">
        <h2 class="text-3xl font-bold mb-4">{{ t('features.title') }}</h2>
        <p class="text-base">{{ t('features.desc') }}</p>
      </div>
      
      <!-- Features Accordion -->
      <div class="features-accordion flex h-[400px] gap-4" @mouseleave="resetExpandedCard">
        <!-- Feature Card 1: Survival -->
        <div 
          class="feature-card rounded-xl overflow-hidden relative group"
          :class="{ 'is-expanded': expandedCardIndex === 0 }"
          @mouseenter="expandCard(0)"
        >
          <img :src="IMAGES.featureSurvival" :alt="t('features.survival_title')" class="feature-card-image">
          <div class="feature-overlay absolute bottom-0 left-0 w-full p-8 text-white">
            <h3 class="feature-title text-3xl font-bold">{{ t('features.survival_title') }}</h3>
            <p class="feature-description text-sm opacity-80 leading-relaxed">{{ t('features.survival_desc') }}</p>
          </div>
        </div>
        <!-- Feature Card 2: Skyblock -->
        <div 
          class="feature-card rounded-xl overflow-hidden relative group"
          :class="{ 'is-expanded': expandedCardIndex === 1 }"
          @mouseenter="expandCard(1)"
        >
          <img :src="IMAGES.featureSkyblock" :alt="t('features.skyblock_title')" class="feature-card-image">
          <div class="feature-overlay absolute bottom-0 left-0 w-full p-8 text-white">
            <h3 class="feature-title text-3xl font-bold">{{ t('features.skyblock_title') }}</h3>
            <p class="feature-description text-sm opacity-80 leading-relaxed">{{ t('features.skyblock_desc') }}</p>
          </div>
        </div>
        <!-- Feature Card 3: Bedwars -->
        <div 
          class="feature-card rounded-xl overflow-hidden relative group"
          :class="{ 'is-expanded': expandedCardIndex === 2 }"
          @mouseenter="expandCard(2)"
        >
          <img :src="IMAGES.featureBedwars" :alt="t('features.bedwars_title')" class="feature-card-image">
          <div class="feature-overlay absolute bottom-0 left-0 w-full p-8 text-white">
            <h3 class="feature-title text-3xl font-bold">{{ t('features.bedwars_title') }}</h3>
            <p class="feature-description text-sm opacity-80 leading-relaxed">{{ t('features.bedwars_desc') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-header h2 {
  color: var(--features-h2-color); /* Using CSS variable */
  text-align: left; /* Ensure left alignment */
}
.section-header p {
  color: var(--features-p-color); /* Using CSS variable */
  text-align: left; /* Ensure left alignment */
}

.features-accordion {
  height: 400px;
}

.feature-card {
  flex: 0 0 300px; /* Adjusted: Slightly decreased default width for a bit more dramatic expansion */
  background-color: var(--feature-card-bg);
  color: var(--feature-card-text);
  transition: flex 0.5s ease-in-out;
  cursor: pointer;
  position: relative;
}

.feature-card.is-expanded {
  flex-grow: 1;
}

.feature-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
}

.feature-card.is-expanded .feature-card-image {
  transform: scale(1.05);
}

.feature-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Align to bottom */
  align-items: flex-start; /* Align to left */
  height: 100%;
  padding: 1rem;
  text-align: left; /* Ensure text aligns left */
}

.feature-title {
  white-space: nowrap; /* Prevent wrapping */
  transition: margin 0.5s ease-in-out;
  margin-bottom: 0.5rem; /* Consistent margin for horizontal layout */
}

.feature-description {
  /* Always visible, but truncated when collapsed */
  max-height: 5em; /* Adjusted: Show more lines of text-sm when collapsed */
  overflow: hidden;
  transition: max-height 0.3s ease-in-out; /* Only transition max-height */
  opacity: 1; /* Always visible */
}

.feature-card.is-expanded .feature-description {
  opacity: 1;
  max-height: 500px; /* Show full description when expanded */
}

/* Responsive adjustments for accordion */
@media (max-width: 768px) {
  .features-accordion {
    flex-direction: column; /* Stack vertically on small screens */
    height: auto; /* Allow height to adjust */
  }

  .feature-card {
    flex: 0 0 auto; /* Allow cards to take auto height */
    width: 100%; /* Full width */
    height: 150px; /* Default narrow height for vertical stack */
  }

  .feature-card.is-expanded {
    height: auto; /* Expanded height for vertical stack */
  }

  /* Ensure description is visible and truncated on mobile as well */
  .feature-description {
    max-height: 5em; /* Adjusted: Show more lines of text-sm when collapsed */
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    opacity: 1;
  }

  .feature-card.is-expanded .feature-description {
    opacity: 1;
    max-height: 500px; /* Adjust as needed */
  }
}

/* Page entry animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>