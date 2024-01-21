import { A } from '@solidjs/router';
import { For } from 'solid-js';
import dayjs from 'dayjs';
import { PAYMENTS_PATH } from '../../utils/path';

const titles = ['Vehículo', 'Comisión', 'Pago', 'Detalles'];

/**
 *
 * @param {Object} props
 * @param {Array} props.payments
 * @returns
 */
function PaymentsTable(props) {
	return (
		<div class='mt-2 overflow-auto bg-white rounded-md shadow-md max-h-[75dvh]'>
			<table class='w-full text-center'>
				<thead class='sticky top-0'>
					<tr class='bg-gray-200 text-base font-semibold'>
						<For each={titles}>{title => <td class='p-4 w-1/6'>{title}</td>}</For>
					</tr>
				</thead>
				<tbody>
					<For each={props.payments}>
						{payment => (
							<tr class='hover:bg-gray-100 border-b text-sm'>
								<td class='p-4 w-1/6 whitespace-nowrap'>{payment.vehiculo}</td>
								<td class='p-4 w-1/6 whitespace-nowrap'>{payment.comision}</td>
								<td class='p-4 w-1/6 whitespace-nowrap'>
									{payment.pago ? dayjs(payment.pago).format('DD/MM/YYYY') : ''}
								</td>
								<td class='w-1/6 whitespace-nowrap'>
									<A class='text-sm font-semibold text-blue-600' href={`${PAYMENTS_PATH}/${payment.id}`}>
										Ver
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

export default PaymentsTable;
