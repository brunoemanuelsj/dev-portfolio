<template>
  <nav class="app_nav">
    <div class="mobile_nav">
      <div class="title">Current Title</div>
      <BurgerIcon class="button_toggle" @click="toggleMenu" :isOpen="isOpen" />
    </div>

    <div class="app_nav_inner" :class="{ mobile_open: isOpen }">
      <RouterLink to="/" class="app_nav_link" @click="closeMenu">
        <BadgeIcon class="icon_nav" />
        <div>About Me</div>
      </RouterLink>

      <RouterLink to="/dashboard" class="app_nav_link" @click="closeMenu">
        <DashboardIcon class="icon_nav" />
        <div>Dashboard</div>
      </RouterLink>

      <RouterLink to="/kanban" class="app_nav_link" @click="closeMenu">
        <KanbanIcon class="icon_nav" />
        <div>Kanban</div>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import BadgeIcon from '@/icons/BadgeIcon.vue';
import DashboardIcon from '@/icons/DashboardIcon.vue';
import KanbanIcon from '@/icons/KanbanIcon.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import BurgerIcon from './BurgerIcon.vue';

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.app_nav {
  background-color: var(--blue-nav);

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;

  height: var(--nav-mobile);
  top: 0;

  color: #fff;

  position: relative;
}

.mobile_nav {
  position: relative;
  display: flex;
}

.title {
  width: 100%;
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 18px;
}

.button_toggle {
  position: absolute;
  right: 0;
}

.app_nav_inner {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  position: absolute;
  top: var(--nav-mobile);
  left: 0;
  right: 0;
  background-color: var(--blue-nav);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.app_nav_inner.mobile_open {
  max-height: 500px;
  overflow-y: auto;
}

.app_nav_link {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
}
.icon_nav {
  margin-right: 18px;
}

@media (min-width: 768px) {
  .app_nav {
    width: var(--nav-desktop);
    min-height: 100vh;
    height: auto;
    border-radius: 0 10px 10px 0;
    padding: 84px 0;
    position: static;
  }

  .mobile_nav {
    display: none;
  }

  .app_nav_inner {
    position: static;
    max-height: none !important;
    background-color: transparent;
    flex-direction: column;
    gap: 15px;
    overflow: visible;
  }

  .app_nav_link {
    padding: 16px 34px;
    color: #fff;
    font-weight: 400;
    transition: background-color 0.3s;
  }

  .app_nav_link:hover {
    background-color: #ffffff25;
  }

  .app_nav_link.router-link-active {
    background-color: #ffffff15;
    font-weight: 500;
  }
}
</style>
