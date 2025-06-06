import { createRouter, createWebHistory } from 'vue-router';
import AboutMeView from '../views/AboutMeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: {
        title: 'About Me',
      },
      path: '/',
      name: 'about-me',
      component: AboutMeView,
    },
    {
      meta: {
        title: 'Dashboard',
      },
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      meta: {
        title: 'Kanban',
      },
      path: '/kanban',
      name: 'kanban',
      component: () => import('../views/KanbanView.vue'),
    },
    {
      meta: {
        title: 'Data Management',
      },
      path: '/data-management',
      name: 'data-management',
      component: () =>
        import('../views/DataManagementView.vue'),
    },
    {
      meta: {
        title: 'Not Found',
      },
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
