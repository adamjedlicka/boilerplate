import { useConvexAuth } from 'convex/react'
import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
	const { isLoading, isAuthenticated } = useConvexAuth()

	if (isLoading) return 'Loading...'
	if (!isAuthenticated) return 'You need to log in.'

	return children
}
