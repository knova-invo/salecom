import { For, Match, Switch } from 'solid-js';
import { A } from '@solidjs/router';
import { CASES_PATH } from '../../utils/path';

const titles = ['ID', 'Vehículo', 'Estado', 'Detalles'];

/**
 *
 * @param {Object} props
 * @param {Array} props.cases
 * @returns
 */
function CasesTable(props) {
	return (
		<div class='mt-2 overflow-auto bg-white rounded-md shadow-md max-h-[75dvh]'>
			<table class='table-auto w-full text-center'>
				<thead class='sticky top-0'>
					<tr class='bg-gray-200 text-base font-semibold'>
						<For each={titles}>{title => <td class='p-4 w-1/6'>{title}</td>}</For>
					</tr>
				</thead>
				<tbody>
					<For each={props.cases}>
						{item => (
							<tr class='hover:bg-gray-100 border-b text-sm'>
								<td class='p-4 w-1/6 whitespace-nowrap'>{item.id}</td>
								<td class='p-4 w-1/6 whitespace-nowrap'>{item.cliente}</td>
								<Switch>
									<Match when={item.diagnostico}>
										<td class='p-4 w-1/6 whitespace-nowrap font-semibold text-green-500'>Diagnosticado</td>
									</Match>
									<Match when={item.date_created}>
										<td class='p-4 w-1/6 whitespace-nowrap font-semibold text-gray-500'>Pendiente</td>
									</Match>
								</Switch>
								<td class='w-1/6 whitespace-nowrap'>
									<A class='text-sm font-semibold text-blue-600' href={`${CASES_PATH}/${item.id}`}>
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

export default CasesTable;
