import { createSignal } from 'solid-js';

/**
 *
 * @param {Object} props
 * @param {String} props.id
 * @param {String} props.placeholder
 * @param {Function} props.search
 * @returns
 */
function SearchInput(props) {
	const [search, setSearch] = createSignal('');

	const handleChange = e => {
		setSearch(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		props.search(search());
	};

	return (
		<form class='flex items-center w-full max-w-md mx-auto bg-white rounded-lg' onSubmit={handleSubmit}>
			<div class='w-full'>
				<input
					{...props}
					id={props.id}
					onChange={handleChange}
					type='search'
					class='w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none'
					placeholder={props.placeholder || 'Buscar'}
					x-model='search'
				/>
			</div>
			<div>
				<button
					type='submit'
					class='flex items-center justify-center w-12 h-12 text-white rounded-r-lg bg-blue-500 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-700/40 ripple-bg-blue-200'
				>
					<svg class='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
						<title>search</title>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
				</button>
			</div>
		</form>
	);
}

export default SearchInput;
