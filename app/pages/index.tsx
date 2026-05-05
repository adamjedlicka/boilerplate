import { useAuthActions } from '@convex-dev/auth/react'
import { Button, Center, Stack, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { signOut } = useAuthActions()

	return (
		<Center h="100vh">
			<Stack align="center">
				<Title>Welcome</Title>
				<Button variant="subtle" onClick={() => signOut()}>
					Sign out
				</Button>
			</Stack>
		</Center>
	)
}
