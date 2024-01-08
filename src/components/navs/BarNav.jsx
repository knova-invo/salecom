import { A, useLocation } from '@solidjs/router';
import { FaSolidCarSide } from 'solid-icons/fa';
import { For } from 'solid-js';
import { IoLogOutOutline } from 'solid-icons/io';
import { FaSolidMoneyBill } from 'solid-icons/fa';
import { IoDocumentText } from 'solid-icons/io';
import { LOGOUT_PATH } from '../../utils/path';

const unSelected =
	'flex flex-col items-center justify-center text-center mx-auto px-4 w-full text-gray-400 group-hover:text-pink-500 border-b-2 border-transparent group-hover:border-pink-500';

const selected =
	'flex flex-col items-center justify-center text-center mx-auto px-4 w-full text-gray-400 text-pink-500 border-b-2 border-transparent border-pink-500';

function BarNav() {
	const location = useLocation();

	console.log(location.pathname);

	const pages = [
		{ name: 'Casos', icon: <IoDocumentText size={32} />, path: '/cases' },
		{ name: 'Clientes', icon: <FaSolidCarSide size={32} />, path: '/clients' },
		{ name: 'Pagos', icon: <FaSolidMoneyBill size={32} />, path: '/pay' },
	];

	return (
		<div class='px-2 bg-white pb-2'>
			<div class='flex'>
				<For each={pages}>
					{(page, i) => (
						<div class='flex-1 group'>
							<A href={page.path} class={location.pathname.includes(page.path) ? selected : unSelected}>
								<div class='mx-auto pt-1'>{page.icon}</div>
								<span class='block px-1'>
									<i class='far fa-home text-xl mb-1 block' />
									<span class='block text-xs pb-1'>{page.name}</span>
								</span>
							</A>
						</div>
					)}
				</For>
				<div class='flex-1 group'>
					<A
						href={LOGOUT_PATH}
						class='flex flex-col items-center justify-center  text-center mx-auto px-4 w-full text-gray-400 group-hover:text-pink-500 border-b-2 border-transparent group-hover:border-pink-500'
					>
						<div class='mx-auto pt-1'>
							<IoLogOutOutline size={32} />
						</div>
						<span class='block px-1'>
							<i class='far fa-home text-xl mb-1 block' />
							<span class='block text-xs pb-1'>Salir</span>
						</span>
					</A>
				</div>
			</div>
		</div>
	);
}
export default BarNav;
