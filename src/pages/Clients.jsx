import { A } from '@solidjs/router';
import { FaSolidPlus } from 'solid-icons/fa';
import SearchInput from '../components/inputs/SearchInput';
import { NEW_CLIENTS_PATH } from '../utils/path';

function Clients() {
	return (
		<>
			<SearchInput />
			<div class='fixed bottom-20 right-2'>
				<A
					href={NEW_CLIENTS_PATH}
					class='bg-blue-500 flex items-center gap-2 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-700/40 ripple-bg-blue-50 text-white rounded-full font-bold py-2 px-4 shadow-lg'
				>
					<span>Agregar Cliente</span>
					<FaSolidPlus size={24} />
				</A>
			</div>
		</>
	);
}
export default Clients;