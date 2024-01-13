import { splitProps } from 'solid-js';
import { AiOutlineSearch } from 'solid-icons/ai';

function SearchInput(props) {
	const [local, others] = splitProps(props, ['label', 'error', 'id', 'required']);

	return (
		<div class='flex items-center w-full max-w-md mx-auto bg-white rounded-lg ' x-data="{ search: '' }">
			<div class='w-full'>
				<input
					{...others}
					id={local.id}
					type={'search'}
					required={local.required}
					aria-invalid={local.error}
					class='w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none'
					placeholder='Buscar'
					x-model='search'
				/>
			</div>
			<div>
				<button
					type='submit'
					class='flex items-center justify-center w-12 h-12 text-white rounded-r-lg bg-blue-500 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-700/40 ripple-bg-blue-100'
				>
					<AiOutlineSearch size={28} />
				</button>
			</div>
		</div>
	);
}
export default SearchInput;
