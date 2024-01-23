import { useParams } from '@solidjs/router';
import { For, createMemo } from 'solid-js';
import dayjs from 'dayjs';
/**
 *
 * @param {Object} props
 * @param {Object} props.review
 * @returns
 */
function CreateReviewCard(props) {
	const params = useParams();
	const data = createMemo(() => {
		return [
			{ key: 'Vehículo', value: props.review.vehiculo.id },
			{ key: 'Marca', value: props.review.vehiculo.marca.nombre || '' },
			{ key: 'Color', value: props.review.vehiculo.color || '' },
			{ key: 'Modelo', value: props.review.vehiculo.modelo || '' },
			{
				key: 'Vendedor',
				value: `${props.review.vendedor?.first_name || ''} ${props.review.vendedor?.last_name || ''}`,
			},
			{
				key: 'Registro',
				value: props.review.date_created ? dayjs(props.review.date_created).format('DD/MM/YYYY') : '',
			},
			{ key: 'Servicios', value: props.review.servicios.map(item => item.servicios_id.nombre).join(', ') },
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

export default CreateReviewCard;
