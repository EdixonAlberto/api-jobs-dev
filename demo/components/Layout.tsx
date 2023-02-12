import { Head } from '$fresh/runtime.ts'
import { JSX } from 'preact'
import { Header } from '$front/components/Header.tsx'
import { Search } from '$front/components/Search.tsx'

export function Layout({ children }: JSX.ElementChildrenAttribute) {
	return (
		<>
			<Head>
				<title>JobsDev</title>
				<meta http-equiv='X-UA-Compatible' content='IE=edge' />
				<meta name='description' content='' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='stylesheet' href='/styles/main.css' />
			</Head>

			<div class='layout__header'>
				<Header />

				<p>JobsDev es el destino número uno para buscar y listar increibles ofertas de trabajo remoto.</p>

				<Search />
			</div>
			{children}
		</>
	)
}
