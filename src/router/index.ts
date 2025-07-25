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
                component: () => import('@/pages/Dashboard.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/formlayout',
                name: 'formlayout',
                component: () => import('@/pages/uikit/FormLayout.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/input',
                name: 'input',
                component: () => import('@/pages/uikit/InputDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/button',
                name: 'button',
                component: () => import('@/pages/uikit/ButtonDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/table',
                name: 'table',
                component: () => import('@/pages/uikit/TableDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/list',
                name: 'list',
                component: () => import('@/pages/uikit/ListDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/tree',
                name: 'tree',
                component: () => import('@/pages/uikit/TreeDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/panel',
                name: 'panel',
                component: () => import('@/pages/uikit/PanelsDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/overlay',
                name: 'overlay',
                component: () => import('@/pages/uikit/OverlayDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/media',
                name: 'media',
                component: () => import('@/pages/uikit/MediaDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/message',
                name: 'message',
                component: () => import('@/pages/uikit/MessagesDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/file',
                name: 'file',
                component: () => import('@/pages/uikit/FileDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/menu',
                name: 'menu',
                component: () => import('@/pages/uikit/MenuDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/charts',
                name: 'charts',
                component: () => import('@/pages/uikit/ChartDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/misc',
                name: 'misc',
                component: () => import('@/pages/uikit/MiscDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'uikit/timeline',
                name: 'timeline',
                component: () => import('@/pages/uikit/TimelineDoc.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'pages/empty',
                name: 'empty',
                component: () => import('@/pages/Empty.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'pages/crud',
                name: 'crud',
                component: () => import('@/pages/Crud.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'documentation',
                name: 'documentation',
                component: () => import('@/pages/Documentation.vue'),
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('@/pages/Landing.vue')
    },
    {
        path: '/pages/notfound',
        name: 'notfound',
        component: () => import('@/pages/NotFound.vue')
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/pages/auth/Login.vue')
    },
    {
        path: '/auth/access',
        name: 'accessDenied',
        component: () => import('@/pages/auth/Access.vue')
    },
    {
        path: '/auth/error',
        name: 'error',
        component: () => import('@/pages/auth/Error.vue')
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
