export function Search() {
	return (
		<div class='search'>
			<div className='jd__input search__input'>
				<input type='text' name='search' placeholder='Buscar Trabajos' />

				<div class='seach__icon'>
					<img class='icon icon__search' src='/svgs/search.svg' alt='icon search' />
				</div>
			</div>
		</div>
	)
}
