import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthGuard } from '../components/AuthGuard'

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	return (
		<>
			<AuthGuard>
				<Outlet />
			</AuthGuard>
			<TanStackRouterDevtools />
		</>
	)
}
