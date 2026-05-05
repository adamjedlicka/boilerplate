import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

const app = document.getElementById('app')

if (!app) throw new Error('#app element not found')

const root = createRoot(app)

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
)
