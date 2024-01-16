import { For, createMemo } from 'solid-js';
import { limit } from '../../utils/constants';

/**
 *
 * @param {Object} props
 * @param {String} props.count
 * @param {Number} props.page
 * @param {Function} props.setPage
 * @returns
 */
function PaginationButton(props) {
	const lengtOptions = createMemo(() => Math.ceil(parseInt(props.count) / limit));
	const options = createMemo(() => [...Array(lengtOptions || 1).keys()]);

	const nextPage = () => {
		props.setPage(props.page + 1);
	};

	const prevPage = () => {
		props.setPage(props.page - 1);
	};

	const selectPage = e => {
		props.setPage(e.target.value);
	};

	return (
		<div class='flex mt-2 gap-1'>
			<button
				class='border disabled:pointer-events-none disabled:bg-slate-300 disabled:opacity-50 disabled:shadow-none bg-white text-gray-700 p-2 focus:outline-none focus:bg-white focus:border-gray-500'
				type='button'
				disabled={props.page === 1}
				onClick={prevPage}
			>
				Anterior
			</button>
			<div class='relative '>
				<select
					value={props.page}
					onChange={selectPage}
					class='border appearance-none h-full bg-white text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
				>
					<For each={options()}>{option => <option value={option + 1}>{option + 1}</option>}</For>
				</select>
				<div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
					<svg class='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
						<title>Down Arrow</title>
						<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
					</svg>
				</div>
			</div>
			<button
				class='border disabled:pointer-events-none disabled:bg-slate-300 disabled:opacity-50 disabled:shadow-none bg-white text-gray-700 p-2 focus:outline-none focus:bg-white focus:border-gray-500'
				type='button'
				disabled={props.page === lengtOptions()}
				onClick={nextPage}
			>
				Siguiente
			</button>
		</div>
	);
}
export default PaginationButton;
