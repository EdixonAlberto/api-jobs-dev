export default function Search() {
	return (
		<div class='search'>
			<div className='jd__input search__input'>
				<input type='text' name='search' placeholder='Buscar Trabajos' />

				<div class='search__icon'>
					<img class='jd__icon' src='/svgs/search.svg' alt='icon search' />
				</div>
			</div>
		</div>
	)
}
