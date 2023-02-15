import { Head } from '$fresh/runtime.ts'
import { LayoutMain } from '$front/components/layouts/LayoutMain.tsx'
import Jobs from '$front/islands/Jobs.tsx'

export default function Home() {
	return (
		<>
			<Head>
				<title>JobsDev</title>
			</Head>

			<LayoutMain>
				<Jobs />
			</LayoutMain>
		</>
	)
}
