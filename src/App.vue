<template>
  <div class="app_wrapper">
    <NavBar />
    <main class="app_main">
      <RouterView v-slot="{ Component }">
        <Transition name="slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
.app_wrapper {
  position: absolute;
  min-height: 100dvh;
  min-width: 100dvw;
  height: 100dvh;
  width: 100dvw;

  overflow: hidden;
  display: flex;
  font-family: 'Roboto', sans-serif;
  flex-direction: column;
  background: #f0f2f5;
}

.app_main {
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;

  padding: 1rem;
  margin-top: var(--nav-mobile);
  transition: margin 0.3s ease;

  width: 100%;
  height: calc(100dvh - var(--nav-mobile));
}

@media (min-width: 768px) {
  .app_wrapper {
    flex-direction: row;
  }

  .app_main {
    margin-top: 0;
    margin-left: var(--nav-desktop);
    padding: 2rem;
    height: 100dvh;
    width: calc(100dvw - var(--nav-desktop));
  }
}

.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
