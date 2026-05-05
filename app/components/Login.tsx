import { useAuthActions } from '@convex-dev/auth/react'
import {
	Anchor,
	Button,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

type Props = {
	onSwitchToRegister: () => void
}

export const Login = ({ onSwitchToRegister }: Props) => {
	const { signIn } = useAuthActions()

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: { email: '', password: '' },
		validate: {
			email: (v) => {
				if (!/^\S+@\S+$/.test(v)) return 'Invalid email'
			},
			password: (v) => {
				if (v.length === 0) return 'Password is required'
			},
		},
	})

	const handleSubmit = form.onSubmit(async ({ email, password }) => {
		try {
			await signIn('password', { email, password, flow: 'signIn' })
		} catch {
			notifications.show({
				color: 'red',
				title: 'Sign in failed',
				message: 'Invalid email or password.',
			})
		}
	})

	return (
		<Paper w={360} p="xl" withBorder shadow="md" radius="md">
			<Stack>
				<Title order={2}>Sign in</Title>
				<form noValidate onSubmit={handleSubmit}>
					<Stack>
						<TextInput
							key={form.key('email')}
							label="Email"
							placeholder="you@example.com"
							type="email"
							autoComplete="email"
							{...form.getInputProps('email')}
						/>
						<PasswordInput
							key={form.key('password')}
							label="Password"
							placeholder="Your password"
							autoComplete="current-password"
							{...form.getInputProps('password')}
						/>
						<Button type="submit" fullWidth loading={form.submitting}>
							Sign in
						</Button>
					</Stack>
				</form>
				<Text size="sm" ta="center">
					Don't have an account?{' '}
					<Anchor component="button" onClick={onSwitchToRegister}>
						Register
					</Anchor>
				</Text>
			</Stack>
		</Paper>
	)
}
