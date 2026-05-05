import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: 'react',
			routesDirectory: './app/pages',
			generatedRouteTree: './app/routeTree.gen.ts',
			autoCodeSplitting: true,
		}),
		react(),
	],
	server: {
		port: 3000,
	},
})
