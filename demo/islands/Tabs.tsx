import { useState } from 'preact/hooks'
import { IconChart, IconHome, IconUser, IconWallet } from '$front/components/Icons.tsx'

export default function Tabs() {
	const [tab, setTab] = useState('')

	return (
		<footer class='tabs'>
			<ul class='tabs__items'>
				<li class={'tabs__items__tab' + (tab === '' ? ' active' : '')} onClick={() => setTab('')}>
					<IconHome />
					<span class='fd-text'>Inicio</span>
				</li>

				<li class={'tabs__items__tab' + (tab === 'statistics' ? ' active' : '')} onClick={() => setTab('statistics')}>
					<IconChart />
					<span class='fd-text'>Estadisticas</span>
				</li>

				<li class={'tabs__items__tab' + (tab === 'subs' ? ' active' : '')} onClick={() => setTab('subs')}>
					<IconWallet />
					<span class='fd-text'>Subscripción</span>
				</li>

				<li class={'tabs__items__tab' + (tab === 'profile' ? ' active' : '')} onClick={() => setTab('profile')}>
					<IconUser />
					<span class='fd-text'>Perfil</span>
				</li>
			</ul>
		</footer>
	)
}
