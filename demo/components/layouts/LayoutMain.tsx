import { Head } from '$fresh/runtime.ts'
import { JSX } from 'preact'
import { Header } from '$front/components/Header.tsx'
import Tabs from '$front/islands/Tabs.tsx'

export function LayoutMain({ children }: JSX.ElementChildrenAttribute) {
	return (
		<>
			<Head>
				<meta http-equiv='X-UA-Compatible' content='IE=edge' />
				<meta name='description' content='' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='stylesheet' href='/styles/main.css' />
			</Head>

			<Header />
			{children}
			<Tabs />
		</>
	)
}
