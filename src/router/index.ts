import { useAppStore } from '@/stores';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import useAuthStore from '@/stores/auth';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';

// const routes: Array<RouteRecordRaw> = [
//     {
//         path: '/',
//         redirect: '/dashboard',
//         name: 'home'
//     },
//     {
//         path: '/',
//         component: AppLayout,
//         children: [
//             {
//                 path: '', // Default child route
//                 redirect: '/dashboard'
//             },
//             {
//                 path: 'dashboard',
//                 name: 'dashboard',
//                 component: () => import('@/pages/dashboard.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'profile',
//                 name: 'profile',
//                 component: () => import('@/pages/profile.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'settings',
//                 name: 'settings',
//                 component: () => import('@/pages/settings.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/formlayout',
//                 name: 'formlayout',
//                 component: () => import('@/pages/uikit/formlayout.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/input',
//                 name: 'input',
//                 component: () => import('@/pages/uikit/inputdoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/button',
//                 name: 'button',
//                 component: () => import('@/pages/uikit/buttondoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/table',
//                 name: 'table',
//                 component: () => import('@/pages/uikit/tabledoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/list',
//                 name: 'list',
//                 component: () => import('@/pages/uikit/listdoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/tree',
//                 name: 'tree',
//                 component: () => import('@/pages/uikit/treedoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/panel',
//                 name: 'panel',
//                 component: () => import('@/pages/uikit/panelsdoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/overlay',
//                 name: 'overlay',
//                 component: () => import('@/pages/uikit/overlaydoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/media',
//                 name: 'media',
//                 component: () => import('@/pages/uikit/mediadoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/message',
//                 name: 'message',
//                 component: () => import('@/pages/uikit/messagesdoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/file',
//                 name: 'file',
//                 component: () => import('@/pages/uikit/filedoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/menu',
//                 name: 'menu',
//                 component: () => import('@/pages/uikit/menudoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/charts',
//                 name: 'charts',
//                 component: () => import('@/pages/uikit/chartdoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/misc',
//                 name: 'misc',
//                 component: () => import('@/pages/uikit/miscdoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'uikit/timeline',
//                 name: 'timeline',
//                 component: () => import('@/pages/uikit/timelinedoc.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'pages/empty',
//                 name: 'empty',
//                 component: () => import('@/pages/empty.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'pages/crud',
//                 name: 'crud',
//                 component: () => import('@/pages/crud.vue'),
//                 meta: { requiresAuth: true }
//             },
//             {
//                 path: 'documentation',
//                 name: 'documentation',
//                 component: () => import('@/pages/documentation.vue'),
//                 meta: { requiresAuth: true }
//             }
//         ]
//     },
//     {
//         path: '/landing',
//         name: 'landing',
//         component: () => import('@/pages/landing.vue')
//     },
//     {
//         path: '/pages/notfound',
//         name: 'notfound',
//         component: () => import('@/pages/notfound.vue')
//     },
//     {
//         path: '/auth/login',
//         name: 'login',
//         component: () => import('@/pages/auth/login.vue')
//     },
//     {
//         path: '/auth/access',
//         name: 'accessDenied',
//         component: () => import('@/pages/auth/access.vue')
//     },
//     {
//         path: '/auth/error',
//         name: 'error',
//         component: () => import('@/pages/auth/error.vue')
//     }
// ];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

console.log(routes);

if (import.meta.hot) {
  handleHotUpdate(router);
}

router.beforeEach((to, from, next) => {
  const store = useAppStore();
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  console.log('to:', to);

  store.setMainLayout((to.meta.layout as string) || 'AuthLayout');

  if (to.path === '/' && !isAuthenticated) {
    return next('/auth/login');
  }

  if (requiresAuth && !isAuthenticated) {
    // prevent redirect loop
    if (to.name !== 'auth-login') {
      return next({ name: 'auth-login', query: { redirect: to.fullPath } });
    }
  }

  if (to.name === 'auth-login' && isAuthenticated) {
    return next('/dashboard');
  }

  next();
});

export default router;
