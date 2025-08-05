import { defineConfig } from 'vite';
import { EditableTreeNode, getFileBasedRouteName, getPascalCaseRouteName, TreeNode, VueRouterAutoImports } from 'unplugin-vue-router';
import { fileURLToPath, URL } from 'node:url';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';

/**
 * Processes and updates route configurations during build time.
 * This function is called for each route in your application.
 * 
 * @param route - The route node being processed
 * @returns The processed route with updated configurations
 */
function updateRoute(route: EditableTreeNode) {
  // Split the route name to handle route groups (e.g., 'private/dashboard' -> ['private', 'dashboard'])
  const [groupPrefix, shortName] = route.name?.split('/') || [];

  // Mark routes under (private) directory as requiring authentication
  const requiresAuth = groupPrefix === 'private';

  // Check if this is a catch-all route (e.g., [...path].vue)
  const isCatchAllRoute = route.path.includes(':path(.*)');

  // Use only the short name (without group prefix) for cleaner route names
  route.name = shortName;

  // Add authentication requirement to meta for routes that need it
  // Skip catch-all routes as they might handle their own authentication
  if (requiresAuth && !isCatchAllRoute) {
    route.addToMeta({ requiresAuth });
  }

  // Process all child routes recursively
  if (route.children) {
    route.children.forEach((childRoute) => {
      updateRoute(childRoute);
    });
  }

  // Debugging: Log route information during build (useful for debugging route generation)
  // This helps in understanding the route structure and debugging routing issues
  console.log({
    // alias: route.alias,  // Uncomment to see route aliases
    children: route.children?.length,  // Number of child routes
    component: route.component,        // Component associated with the route
    fullPath: route.fullPath,          // Full path including parent routes
    meta: route.meta,                  // Route metadata (includes requiresAuth)
    name: route.name,                  // Route name (without group prefix)
    parent: route.parent?.name,        // Parent route name (for nested routes)
    path: route.path,                  // Route path pattern
    shortName,                         // Short name (without group prefix)
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
      /**
       * Custom route name generator for Vue Router
       * Transforms file-based route names into URL-friendly format
       * 
       * Example transformations:
       * - `pages/(private)/dashboard/index.vue` -> `private/dashboard`
       * - `pages/user/profile.vue` -> `user-profile`
       */
      getRouteName: (routeNode) => {
        // Get the route name in PascalCase (e.g., 'UserProfile')
        const pascalCaseName = getPascalCaseRouteName(routeNode);
        // Get the file-based route name (includes directory structure)
        const fileBasedName = getFileBasedRouteName(routeNode);

        // Extract route group from directory name if it exists (e.g., 'private' from '(private)')
        const match = fileBasedName.match(/\(([^)]+)\)/);
        const groupPrefix = match ? match[1] : '';

        // Start with the PascalCase name and clean it up
        let name = pascalCaseName;

        // Remove 'Root' prefix that might be added by the router
        name = name.replace(/^Root/, '');

        // Convert to kebab-case and prepend group prefix if it exists
        // Example: 'UserProfile' -> 'user-profile' or 'private/user-profile'
        const finalName = `${groupPrefix ? `${groupPrefix}/` : ''}${name
          // Add hyphens between camelCase (e.g., 'UserProfile' -> 'User-Profile')
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          // Convert to lowercase
          .toLowerCase()
          }`;

        // Debug log (uncomment when needed)
        // console.log({ pascalCaseName, fileBasedName, finalName, groupPrefix });

        return finalName;
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
