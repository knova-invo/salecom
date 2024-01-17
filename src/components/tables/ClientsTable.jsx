import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { CLIENTS_PATH } from '../../utils/path';

const titles = ['Cliente', 'Detalles'];

/**
 *
 * @param {Object} props
 * @param {Array} props.clients
 * @returns
 */
function ClientsTable(props) {
	return (
		<div class='mt-2 overflow-auto flex bg-white rounded-md shadow-md max-h-[75vh]'>
			<table class='table-auto w-full text-center'>
				<thead class='sticky top-0'>
					<tr class='bg-gray-200 text-base font-semibold'>
						<For each={titles}>{title => <td class='p-4 w-1/6'>{title}</td>}</For>
					</tr>
				</thead>
				<tbody>
					<For each={props.clients}>
						{client => (
							<tr class='hover:bg-gray-100 border-b text-sm'>
								<td class='p-4 w-1/6 whitespace-nowrap'>{client.id}</td>
								<td class='w-1/6 whitespace-nowrap'>
									<A class='text-sm font-semibold text-blue-600' href={`${CLIENTS_PATH}/${client.id}`}>
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
export default ClientsTable;
