import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		nitro(),
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
