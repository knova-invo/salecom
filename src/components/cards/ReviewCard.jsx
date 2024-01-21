import { useParams } from '@solidjs/router';
import { For, createMemo } from 'solid-js';
import dayjs from 'dayjs';
/**
 *
 * @param {Object} props
 * @param {Object} props.review
 * @returns
 */
function ReviewCard(props) {
	const params = useParams();
	const data = createMemo(() => {
		return [
			{ key: 'Vehículo', value: props.review.vehiculo.id },
			{ key: 'Color', value: props.review.vehiculo.color.nombre || '' },
			{ key: 'Marca', value: props.review.vehiculo.marca.nombre || '' },
			{ key: 'Modelo', value: props.review.vehiculo.modelo || '' },
			{
				key: 'Vendedor',
				value: `${props.review.vendedor?.first_name || ''} ${props.review.vendedor?.last_name || ''}`,
			},
			{
				key: 'Registro',
				value: props.review.date_created ? dayjs(props.review.date_created).format('DD/MM/YYYY') : '',
			},
			{
				key: 'Diagnóstico',
				value: props.review.diagnostico ? dayjs(props.review.diagnostico).format('DD/MM/YYYY') : '',
			},
			{
				key: 'Pago',
				value: props.review.pago ? dayjs(props.review.pago).format('DD/MM/YYYY') : '',
			},
			{ key: 'Comisión', value: props.review.comision },
			{ key: 'Servicios', value: props.review.servicios.map(item => item.servicios_id.nombre).join(', ') },
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

export default ReviewCard;
