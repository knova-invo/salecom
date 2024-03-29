import { FaSolidMoneyBill } from 'solid-icons/fa';
import { AiOutlineHistory } from 'solid-icons/ai';
import { IoLogOutOutline } from 'solid-icons/io';
import { FaSolidCarSide } from 'solid-icons/fa';
import { IoDocumentText } from 'solid-icons/io';
import { A } from '@solidjs/router';
import { For } from 'solid-js';
import {
	CASES_PATH,
	VEHICLES_PATH,
	LOGOUT_PATH,
	PAYMENTS_PATH,
	PAYOUTS_PATH,
	REVIEWS_PATH,
	HISTORY_REVIEWS_PATH,
	HISTORY_PAYOUTS_PATH,
} from '../../utils/path';
import Role from '../utils/Role';
import { reviewer, seller, treasurer } from '../../utils/constants';

const unSelected =
	'flex flex-col items-center justify-center text-center mx-auto px-4 w-full text-gray-400 border-b-2 border-transparent group-hover:text-indigo-500 group-hover:text-indigo-500';

const selected =
	'flex flex-col items-center justify-center text-center mx-auto px-4 w-full border-b-2 border-transparent text-indigo-500 border-indigo-500';

function BarNav() {
	const { role } = Role;
	const pages = {
		[reviewer]: [
			{ name: 'Casos', icon: <IoDocumentText size={32} />, path: REVIEWS_PATH },
			{ name: 'Histórico', icon: <AiOutlineHistory size={32} />, path: HISTORY_REVIEWS_PATH },
		],
		[treasurer]: [
			{ name: 'Pagos', icon: <FaSolidMoneyBill size={32} />, path: PAYOUTS_PATH },
			{ name: 'Histórico', icon: <AiOutlineHistory size={32} />, path: HISTORY_PAYOUTS_PATH },
		],
		[seller]: [
			{ name: 'Casos', icon: <IoDocumentText size={32} />, path: CASES_PATH },
			{ name: 'Vehículos', icon: <FaSolidCarSide size={32} />, path: VEHICLES_PATH },
			{ name: 'Pagos', icon: <FaSolidMoneyBill size={32} />, path: PAYMENTS_PATH },
		],
	};

	return (
		<div class='px-2 bg-white pb-2'>
			<div class='flex'>
				<For each={pages[role()]}>
					{page => (
						<div class='flex-1 group'>
							<A href={page.path} inactiveClass={unSelected} activeClass={selected}>
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
					<A href={LOGOUT_PATH} class={unSelected}>
						<div class='mx-auto pt-1'>
							<IoLogOutOutline size={32} />
						</div>
						<span class='block px-1'>
							<i class='far fa-home text-xl mb-1 block ' />
							<span class='block text-xs pb-1'>Salir</span>
						</span>
					</A>
				</div>
			</div>
		</div>
	);
}

export default BarNav;
