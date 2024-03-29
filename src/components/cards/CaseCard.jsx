import { useParams } from '@solidjs/router';
import { For, createMemo } from 'solid-js';
import dayjs from 'dayjs';
/**
 *
 * @param {Object} props
 * @param {Object} props.case
 * @returns
 */
function CaseCard(props) {
	const params = useParams();
	const data = createMemo(() => {
		return [
			{ key: 'Vehículo', value: props.case.vehiculo },
			{
				key: 'FRegistro',
				value: props.case.date_created ? dayjs(props.case.date_created).format('DD/MM/YYYY') : '',
			},
			{
				key: 'Diagnóstico',
				value: props.case.diagnostico ? dayjs(props.case.diagnostico).format('DD/MM/YYYY') : '',
			},
			{ key: 'Comisión', value: props.case.comision },
			{ key: 'Servicios', value: props.case.servicios.map(item => item.servicios_id.nombre).join(', ') },
		];
	});
	return (
		<div class='mt-2 bg-white rounded-md shadow-md p-4 text-left'>
			<h1 class='text-2xl font-bold px-2'>Caso {params.id}</h1>
			<For each={data()}>
				{item => (
					<div class='grid grid-cols-2 hover:bg-gray-50 space-y-0 p-2 border-b pt-6'>
						<p class='text-gray-600'>{item.key}</p>
						<p>{item.value}</p>
					</div>
				)}
			</For>
		</div>
	);
}

export default CaseCard;
