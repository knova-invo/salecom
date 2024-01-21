import { A } from '@solidjs/router';
import { For } from 'solid-js';
import dayjs from 'dayjs';
import { HISTORY_PAYOUTS_PATH } from '../../utils/path';

const titles = ['Vehículo', 'Vendedor', 'Fecha', 'Detalles'];

/**
 *
 * @param {Object} props
 * @param {Array} props.payouts
 * @returns
 */
function PHistoryTable(props) {
	return (
		<div class='mt-2 overflow-auto bg-white rounded-md shadow-md max-h-[75dvh]'>
			<table class='table-auto w-full text-center'>
				<thead class='sticky top-0'>
					<tr class='bg-gray-200 text-base font-semibold'>
						<For each={titles}>{title => <td class='p-4 w-1/6'>{title}</td>}</For>
					</tr>
				</thead>
				<tbody>
					<For each={props.payouts}>
						{item => (
							<tr class='hover:bg-gray-100 border-b text-sm'>
								<td class='p-4 w-1/6 whitespace-nowrap'>{item.vehiculo}</td>
								<td class='p-4 w-1/6'>{`${item.vendedor?.first_name || ''} ${item.vendedor?.last_name || ''}`}</td>
								<td class='p-4 w-1/6 whitespace-nowrap'>{item.pago ? dayjs(item.pago).format('DD/MM/YYYY') : ''}</td>
								<td class='w-1/6 whitespace-nowrap'>
									<A class='text-sm font-semibold text-blue-600' href={`${HISTORY_PAYOUTS_PATH}/${item.id}`}>
										Más
									</A>
								</td>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</div>
	);
}

export default PHistoryTable;
