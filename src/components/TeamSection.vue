<script setup>
/**
 * @file TeamSection.vue
 * @description Displays a section with team members. Badges are theme-aware and styled distinctly.
 */

import { useI18n } from 'vue-i18n';
import { IMAGES } from '../config/images';

const { t } = useI18n();
</script>

<template>
  <!-- Team Section container -->
  <section class="py-20 fade-in-up"> <!-- Added fade-in-up class for entry animation -->
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-10 section-header">
        <h2 class="text-3xl font-bold mb-4">{{ t('team.title') }}</h2>
        <p class="text-base">{{ t('team.desc') }}</p>
      </div>

      <!-- Grid for team member cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Team Member Card 1 -->
        <a href="https://qm.qq.com/q/3Sf7Bibsli" target="_blank" rel="noopener noreferrer" class="team-card-link">
          <div v-scroll-fade="{ delay: 0 }" v-edge-glow class="team-card-glow relative overflow-hidden rounded-xl p-5 flex items-center v-edge-glow-container">
            <div class="w-16 h-16 rounded-full mr-4 flex-shrink-0 avatar-bg relative">
              <img :src="IMAGES.avatarApart" :alt="t('team.member_1_name')" class="w-full h-full object-cover rounded-full">
              <span class="badge-on-avatar text-xs px-1.5 py-0.5 rounded badge-owner text-white font-normal">{{ t('team.member_1_badge') }}</span>
            </div>
            <div class="flex-grow">
              <h4 class="text-base font-semibold mb-1">
                {{ t('team.member_1_name') }}
              </h4>
              <p class="text-sm">{{ t('team.member_1_role') }}</p>
            </div>
          </div>
        </a>
        <!-- Team Member Card 2 -->
        <a href="https://qm.qq.com/q/EDEkjS62pq" target="_blank" rel="noopener noreferrer" class="team-card-link">
          <div v-scroll-fade="{ delay: 100 }" v-edge-glow class="team-card-glow relative overflow-hidden rounded-xl p-5 flex items-center v-edge-glow-container">
            <div class="w-16 h-16 rounded-full mr-4 flex-shrink-0 avatar-bg relative">
              <img :src="IMAGES.avatarTom" :alt="t('team.member_2_name')" class="w-full h-full object-cover rounded-full">
              <div class="stacked-badges"> <!-- New container for stacked badges -->
                <span class="badge-item text-xs px-1.5 py-0.5 rounded badge-owner text-white font-normal">{{ t('team.member_2_badge') }}</span>
                <span class="badge-item text-xs px-1.5 py-0.5 rounded badge-supporter text-white font-normal">{{ t('team.member_2_supporter_badge') }}</span> <!-- New badge -->
              </div>
            </div>
            <div class="flex-grow">
              <h4 class="text-base font-semibold mb-1">
                {{ t('team.member_2_name') }}
              </h4>
              <p class="text-sm">{{ t('team.member_2_role') }}</p>
            </div>
          </div>
        </a>
        <!-- Team Member Card 3 -->
        <a href="https://qm.qq.com/q/EDEkjS62pq" target="_blank" rel="noopener noreferrer" class="team-card-link">
          <div v-scroll-fade="{ delay: 200 }" v-edge-glow class="team-card-glow relative overflow-hidden rounded-xl p-5 flex items-center v-edge-glow-container">
            <div class="w-16 h-16 rounded-full mr-4 flex-shrink-0 avatar-bg relative">
              <img :src="IMAGES.avatarFrank" :alt="t('team.member_3_name')" class="w-full h-full object-cover rounded-full">
              <div class="stacked-badges"> <!-- New container for stacked badges -->
                <span class="badge-item text-xs px-1.5 py-0.5 rounded badge-owner text-white font-normal">{{ t('team.member_3_badge') }}</span>
                <span class="badge-item text-xs px-1.5 py-0.5 rounded badge-supporter text-white font-normal">{{ t('team.member_3_supporter_badge') }}</span> <!-- New badge -->
              </div>
            </div>
            <div class="flex-grow">
              <h4 class="text-base font-semibold mb-1">
                {{ t('team.member_3_name') }}
              </h4>
              <p class="text-sm">{{ t('team.member_3_role') }}</p>
            </div>
          </div>
        </a>
        <!-- Team Member Card 4 -->
        <a href="https://qm.qq.com/q/EDEkjS62pq" target="_blank" rel="noopener noreferrer" class="team-card-link">
          <div v-scroll-fade="{ delay: 300 }" v-edge-glow class="team-card-glow relative overflow-hidden rounded-xl p-5 flex items-center v-edge-glow-container">
            <div class="w-16 h-16 rounded-full mr-4 flex-shrink-0 avatar-bg relative">
              <img :src="IMAGES.avatarCoco" :alt="t('team.member_4_name')" class="w-full h-full object-cover rounded-full">
              <span class="badge-on-avatar text-xs px-1.5 py-0.5 rounded badge-founder text-white font-normal">{{ t('team.member_4_badge') }}</span>
            </div>
            <div class="flex-grow">
              <h4 class="text-base font-semibold mb-1">
                {{ t('team.member_4_name') }}
              </h4>
              <p class="text-sm">{{ t('team.member_4_role') }}</p>
            </div>
          </div>
        </a>
        <!-- Team Member Card 5 -->
        <a href="https://qm.qq.com/q/EDEkjS62pq" target="_blank" rel="noopener noreferrer" class="team-card-link">
          <div v-scroll-fade="{ delay: 400 }" v-edge-glow class="team-card-glow relative overflow-hidden rounded-xl p-5 flex items-center v-edge-glow-container">
            <div class="w-16 h-16 rounded-full mr-4 flex-shrink-0 avatar-bg relative">
              <img :src="IMAGES.avatarSteve" :alt="t('team.member_5_name')" class="w-full h-full object-cover rounded-full">
              <span class="badge-on-avatar text-xs px-1.5 py-0.5 rounded badge-founder text-white font-normal">{{ t('team.member_5_badge') }}</span>
            </div>
            <div class="flex-grow">
              <h4 class="text-base font-semibold mb-1">
                {{ t('team.member_5_name') }}
              </h4>
              <p class="text-sm">{{ t('team.member_5_role') }}</p>
            </div>
          </div>
        </a>
        <!-- Team Member Card 6 -->
        <a href="https://qm.qq.com/q/EDEkjS62pq" target="_blank" rel="noopener noreferrer" class="team-card-link">
          <div v-edge-glow class="team-card-glow relative overflow-hidden rounded-xl p-5 flex items-center v-edge-glow-container">
            <div class="w-16 h-16 rounded-full mr-4 flex-shrink-0 avatar-bg relative">
              <img :src="IMAGES.avatarSean" :alt="t('team.member_6_name')" class="w-full h-full object-cover rounded-full">
              <span class="badge-on-avatar text-xs px-1.5 py-0.5 rounded badge-founder text-white font-normal">{{ t('team.member_6_badge') }}</span>
            </div>
            <div class="flex-grow">
              <h4 class="text-base font-semibold mb-1">
                {{ t('team.member_6_name') }}
              </h4>
              <p class="text-sm">{{ t('team.member_6_role') }}</p>
            </div>
          </div>
        </a>
        <!-- Team Member Card 7 -->
        <a href="https://qm.qq.com/q/EDEkjS62pq" target="_blank" rel="noopener noreferrer" class="team-card-link">
          <div v-edge-glow class="team-card-glow relative overflow-hidden rounded-xl p-5 flex items-center v-edge-glow-container">
            <div class="w-16 h-16 rounded-full mr-4 flex-shrink-0 avatar-bg relative">
              <img :src="IMAGES.avatarAlves" :alt="t('team.member_7_name')" class="w-full h-full object-cover rounded-full">
              <span class="badge-on-avatar text-xs px-1.5 py-0.5 rounded badge-founder text-white font-normal">{{ t('team.member_7_badge') }}</span>
            </div>
            <div class="flex-grow">
              <h4 class="text-base font-semibold mb-1">
                {{ t('team.member_7_name') }}
              </h4>
              <p class="text-sm">{{ t('team.member_7_role') }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Base styles for the team card */
.team-card-glow {
  z-index: 1; /* Ensures the card content is above the pseudo-element glow */
  background-color: var(--card-bg-color); /* Theme-aware background color */
  color: var(--text-main); /* Theme-aware default text color */
}

/* Styles for team card link wrapper */
.team-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  /* Performance optimization: GPU acceleration */
  will-change: transform;
  transform: translateZ(0);
}

.team-card-link:hover {
  transform: translateY(-4px);
}

.team-card-link:hover .team-card-glow {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Performance optimization for team card glow container */
.team-card-glow {
  will-change: box-shadow;
  transition-property: box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

/* Theme-aware background for avatar placeholders */
.avatar-bg {
  background-color: var(--avatar-bg);
}

/* Theme-aware text color for member names */
.team-card-glow h4 {
  color: var(--text-main);
}
/* Theme-aware text color for member roles */
.team-card-glow p {
  color: var(--text-sub);
}

/* Styles for badge on avatar (single badge) */
.badge-on-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(25%, 25%); /* Adjust to position outside the circle slightly */
  z-index: 10; /* Ensure it's above the avatar image */
  font-size: 0.625rem; /* text-xs (10px) */
  padding: 0.125rem 0.375rem; /* px-1.5 py-0.5 (2px 6px) */
  line-height: 1; /* Adjust line height for better appearance */
  white-space: nowrap; /* Prevent text wrapping */
}

/* Styles for stacked badges container */
.stacked-badges {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column; /* Stack vertically */
  align-items: flex-end; /* Align badges to the right */
  transform: translate(25%, 25%); /* Move the whole container out */
  z-index: 10;
  gap: 4px; /* Space between badges */
}

/* Styles for individual badges within the stacked container */
.stacked-badges .badge-item {
  font-size: 0.625rem; /* text-xs (10px) */
  padding: 0.125rem 0.375rem; /* px-1.5 py-0.5 (2px 6px) */
  line-height: 1; /* Adjust line height for better appearance */
  white-space: nowrap; /* Prevent text wrapping */
}

/* Theme-aware background colors for badges */
.badge-owner {
  background-color: var(--badge-owner-bg);
  color: var(--badge-owner-text);
}
.badge-founder {
  background-color: var(--badge-founder-bg);
  color: var(--badge-founder-text);
}
.badge-supporter { /* New badge style */
  background-color: var(--badge-supporter-bg, #4CAF50); /* Default green, can be themed */
  color: var(--badge-supporter-text, white);
}

/* Theme-aware colors for the section header */
.section-header h2 {
  color: var(--features-h2-color); /* Using CSS variable for consistency */
  text-align: left;
}
.section-header p {
  color: var(--features-p-color); /* Using CSS variable for consistency */
  text-align: left;
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