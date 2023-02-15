import { LayoutMain } from '$front/components/layouts/LayoutMain.tsx'
import { Head } from '$fresh/runtime.ts'

export default function profile() {
	return (
		<LayoutMain>
			<Head>
				<title>JobsDev | Perfil</title>
			</Head>

			<div className='profile'>
				Profile
			</div>
		</LayoutMain>
	)
}
