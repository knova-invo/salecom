import { A } from '@solidjs/router';
import { FaSolidPlus } from 'solid-icons/fa';
import SearchInput from '../components/inputs/SearchInput';
import { NEW_CLIENTS_PATH } from '../utils/path';

function Clients() {
	return (
		<div className='flex-1'>
			<SearchInput />
			<div class='fixed bottom-20 right-2'>
				<A
					href={NEW_CLIENTS_PATH}
					class='bg-blue-500 justify-center flex items-center gap-1 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-700/40 ripple-bg-blue-100 text-white rounded-full font-bold py-2 px-4 shadow-lg'
				>
					<span>Añadir Cliente</span>
					<FaSolidPlus size={22} />
				</A>
			</div>
		</div>
	);
}
export default Clients;
