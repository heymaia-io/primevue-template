import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import useAuthStore from '@/stores/auth';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '', // Default child route
                redirect: '/dashboard'
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/formlayout',
                name: 'formlayout',
                component: () => import('@/views/uikit/FormLayout.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/input',
                name: 'input',
                component: () => import('@/views/uikit/InputDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/button',
                name: 'button',
                component: () => import('@/views/uikit/ButtonDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/table',
                name: 'table',
                component: () => import('@/views/uikit/TableDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/list',
                name: 'list',
                component: () => import('@/views/uikit/ListDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/tree',
                name: 'tree',
                component: () => import('@/views/uikit/TreeDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/panel',
                name: 'panel',
                component: () => import('@/views/uikit/PanelsDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/overlay',
                name: 'overlay',
                component: () => import('@/views/uikit/OverlayDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/media',
                name: 'media',
                component: () => import('@/views/uikit/MediaDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/message',
                name: 'message',
                component: () => import('@/views/uikit/MessagesDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/file',
                name: 'file',
                component: () => import('@/views/uikit/FileDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/menu',
                name: 'menu',
                component: () => import('@/views/uikit/MenuDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/charts',
                name: 'charts',
                component: () => import('@/views/uikit/ChartDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/misc',
                name: 'misc',
                component: () => import('@/views/uikit/MiscDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/timeline',
                name: 'timeline',
                component: () => import('@/views/uikit/TimelineDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'pages/empty',
                name: 'empty',
                component: () => import('@/views/pages/Empty.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'pages/crud',
                name: 'crud',
                component: () => import('@/views/pages/Crud.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'documentation',
                name: 'documentation',
                component: () => import('@/views/pages/Documentation.vue'),
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('@/views/pages/Landing.vue')
    },
    {
        path: '/pages/notfound',
        name: 'notfound',
        component: () => import('@/views/pages/NotFound.vue')
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/pages/auth/Login.vue')
    },
    {
        path: '/auth/access',
        name: 'accessDenied',
        component: () => import('@/views/pages/auth/Access.vue')
    },
    {
        path: '/auth/error',
        name: 'error',
        component: () => import('@/views/pages/auth/Error.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (to.path === '/' && !isAuthenticated) {
        return next('/auth/login');
    }

    if (requiresAuth && !isAuthenticated) {
        return next('/auth/login');
    }

    if (to.name === 'login' && isAuthenticated) {
        return next('/dashboard');
    }

    next();
});

export default router;
