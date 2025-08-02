import { defineConfig } from 'vite';
import { EditableTreeNode, getPascalCaseRouteName, VueRouterAutoImports } from 'unplugin-vue-router';
import { fileURLToPath, URL } from 'node:url';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';

function updateRoute(route: EditableTreeNode) {
  // any route inside the dir src/pages/(public) as well as the src/pages/[...path].vue doesn't requires auth, any other route does
  const isPublicRoute = route.fullPath.includes('(public)');
  const isCatchAllRoute = route.path.includes(':path(.*)');

  if (!isPublicRoute && !isCatchAllRoute) {
    route.meta = {
      ...route.meta,
      requiresAuth: true,
    };
  }

  if (route.children) {
    // Recursively update child routes
    route.children.forEach((childRoute) => {
      updateRoute(childRoute);
    });
  }

  /* uncomment the following console to see all the route values in terminal */
  console.log({
    alias: route.alias,
    fullPath: route.fullPath,
    name: route.name,
    path: route.path,
    component: route.component,
    children: route.children?.length,
    meta: route.meta,
    parent: route.parent?.name,
  });

  return route;
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },
  optimizeDeps: {
    noDiscovery: true,
  },
  plugins: [
    VueRouter({
      getRouteName: (routeNode) => {
        let name = getPascalCaseRouteName(routeNode);

        // Remove route group prefixes from name generation
        name = name.replace(/^Root/, '');
        name = name.replace(/^Public/, '');

        return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      },
      importMode: 'async',
      async beforeWriteFiles(rootRoute) {
        rootRoute.children.forEach((route: EditableTreeNode) => {
          updateRoute(route);
        });
      },
    }),
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
