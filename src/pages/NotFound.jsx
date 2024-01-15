import { A } from '@solidjs/router';
import { ROOT_PATH } from '../utils/path';

function NotFound() {
	return (
		<div class='flex-1 px-8 flex'>
			<div class='flex m-auto flex-col items-center justify-center gap-6 p-8 bg-white rounded-md border border-gray-100 shadow-xl'>
				<p class='text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300'>404</p>
				<p class='text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500  text-center'>
					Página no encontrada
				</p>
				<p class='text-gray-500 pb-4 border-b-2 text-center'>
					Disculpa, la página que estás buscando no fue encontrada.
				</p>
				<A
					href={ROOT_PATH}
					class='flex items-center text-white space-x-2 px-4 py-2 mt-6 rounded transition duration-150 bg-blue-500 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-700/40 ripple-bg-blue-200'
					title='Página Principal'
				>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
						<title>Página Principal</title>
						<path
							fill-rule='evenodd'
							d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
							clip-rule='evenodd'
						/>
					</svg>
					<span>Página Principal</span>
				</A>
			</div>
		</div>
	);
}
export default NotFound;
