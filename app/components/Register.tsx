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
	onSwitchToLogin: () => void
}

export const Register = ({ onSwitchToLogin }: Props) => {
	const { signIn } = useAuthActions()

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: { email: '', password: '', confirmPassword: '' },
		validate: {
			email: (v) => {
				if (!/^\S+@\S+$/.test(v)) return 'Invalid email'
			},
			password: (v) => {
				if (v.length < 8) return 'Password must be at least 8 characters'
			},
			confirmPassword: (v, values) => {
				if (v !== values.password) return 'Passwords do not match'
			},
		},
	})

	const handleSubmit = form.onSubmit(async ({ email, password }) => {
		try {
			await signIn('password', { email, password, flow: 'signUp' })
		} catch {
			notifications.show({
				color: 'red',
				title: 'Registration failed',
				message: 'This email may already be in use.',
			})
		}
	})

	return (
		<Paper w={360} p="xl" withBorder shadow="md" radius="md">
			<Stack>
				<Title order={2}>Create account</Title>
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
							placeholder="At least 8 characters"
							autoComplete="new-password"
							{...form.getInputProps('password')}
						/>
						<PasswordInput
							key={form.key('confirmPassword')}
							label="Confirm password"
							placeholder="Repeat your password"
							autoComplete="new-password"
							{...form.getInputProps('confirmPassword')}
						/>
						<Button type="submit" fullWidth loading={form.submitting}>
							Create account
						</Button>
					</Stack>
				</form>
				<Text size="sm" ta="center">
					Already have an account?{' '}
					<Anchor component="button" onClick={onSwitchToLogin}>
						Sign in
					</Anchor>
				</Text>
			</Stack>
		</Paper>
	)
}
