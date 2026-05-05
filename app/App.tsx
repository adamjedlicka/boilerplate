import { ConvexAuthProvider } from '@convex-dev/auth/react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ConvexReactClient } from 'convex/react'
import { routeTree } from './routeTree.gen'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export function App() {
	return (
		<ConvexAuthProvider client={convex}>
			<RouterProvider router={router} />
		</ConvexAuthProvider>
	)
}
