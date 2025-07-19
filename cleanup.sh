#!/bin/bash

echo "🧹 Starting cleanup process..."

# Remove node_modules
if [ -d "node_modules" ]; then
    echo "📦 Removing node_modules..."
    rm -rf node_modules
    echo "✅ node_modules removed"
else
    echo "ℹ️  node_modules not found"
fi

# Remove auto-generated TypeScript declaration files
echo "🔧 Removing auto-generated TypeScript files..."

if [ -f "auto-imports.d.ts" ]; then
    rm auto-imports.d.ts
    echo "✅ auto-imports.d.ts removed"
fi

if [ -f "components.d.ts" ]; then
    rm components.d.ts
    echo "✅ components.d.ts removed"
fi

if [ -f "typed-router.d.ts" ]; then
    rm typed-router.d.ts
    echo "✅ typed-router.d.ts removed"
fi

# Clear npm cache
echo "💾 Clearing npm cache..."
npm cache clean --force
echo "✅ npm cache cleared"

# Clear pnpm cache (if pnpm is used)
if command -v pnpm &> /dev/null; then
    echo "💾 Clearing pnpm cache..."
    pnpm store prune
    echo "✅ pnpm cache cleared"
fi

# Remove package-lock.json and pnpm-lock.yaml
if [ -f "package-lock.json" ]; then
    rm package-lock.json
    echo "✅ package-lock.json removed"
fi

if [ -f "pnpm-lock.yaml" ]; then
    rm pnpm-lock.yaml
    echo "✅ pnpm-lock.yaml removed"
fi

# Clear Vite cache
if [ -d "node_modules/.vite" ]; then
    rm -rf node_modules/.vite
    echo "✅ Vite cache cleared"
fi

# Clear dist folder
if [ -d "dist" ]; then
    rm -rf dist
    echo "✅ dist folder removed"
fi

echo ""
echo "🎉 Cleanup completed successfully!"
echo "📝 You can now run 'pnpm install' to reinstall dependencies"
echo ""
