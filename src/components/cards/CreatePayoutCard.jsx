import { useParams } from '@solidjs/router';
import { For, createMemo } from 'solid-js';
import dayjs from 'dayjs';
/**
 *
 * @param {Object} props
 * @param {Object} props.payout
 * @returns
 */
function CreatePayoutCard(props) {
	const params = useParams();
	const data = createMemo(() => {
		return [
			{ key: 'Vehículo', value: props.payout.vehiculo },
			{
				key: 'Vendedor',
				value: `${props.payout.vendedor?.first_name || ''} ${props.payout.vendedor?.last_name || ''}`,
			},
			{
				key: 'Fecha de registro',
				value: props.payout.date_created ? dayjs(props.payout.date_created).format('DD/MM/YYYY') : '',
			},
			{
				key: 'Fecha de diagnóstico',
				value: props.payout.diagnostico ? dayjs(props.payout.diagnostico).format('DD/MM/YYYY') : '',
			},
			{ key: 'Comisión', value: props.payout.comision },
			{ key: 'Servicios', value: props.payout.servicios.map(item => item.servicios_id.nombre).join(', ') },
		];
	});
	return (
		<div class=' bg-white m-4 flex-1 rounded-md shadow-md p-4 text-left'>
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

export default CreatePayoutCard;
