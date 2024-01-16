import { AiOutlineSearch } from 'solid-icons/ai';
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
					<AiOutlineSearch size={28} />
				</button>
			</div>
		</form>
	);
}
export default SearchInput;
