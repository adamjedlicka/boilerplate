import { Center } from '@mantine/core'
import { useConvexAuth } from 'convex/react'
import { type ReactNode, useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'

type Props = {
	children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
	const { isLoading, isAuthenticated } = useConvexAuth()
	const [view, setView] = useState<'login' | 'register'>('login')

	if (isLoading) return null

	if (!isAuthenticated) {
		return (
			<Center h="100vh">
				{view === 'login' ? (
					<Login onSwitchToRegister={() => setView('register')} />
				) : (
					<Register onSwitchToLogin={() => setView('login')} />
				)}
			</Center>
		)
	}

	return children
}
