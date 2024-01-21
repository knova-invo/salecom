import { useParams } from '@solidjs/router';
import { For, createMemo } from 'solid-js';
import dayjs from 'dayjs';

/**
 *
 * @param {Object} props
 * @param {Object} props.vehicle
 * @returns
 */
function VehicleCard(props) {
	const params = useParams();
	const data = createMemo(() => {
		return [
			{
				key: 'Fecha de registro',
				value: props.vehicle.date_created ? dayjs(props.vehicle.date_created).format('DD/MM/YYYY') : '',
			},
			{ key: 'Color', value: props.vehicle.color.nombre },
			{ key: 'Marca', value: props.vehicle.marca.nombre },
			{ key: 'Modelo', value: props.vehicle.modelo },
			{ key: 'Nombre', value: props.vehicle.nombre },
			{ key: 'Cedula', value: props.vehicle.cedula },
			{ key: 'Teléfono', value: props.vehicle.telefono },
			{ key: 'Correo', value: props.vehicle.correo },
		];
	});

	return (
		<div class='mt-2 bg-white rounded-md shadow-md p-4 text-left'>
			<h1 class='text-2xl font-bold px-2'> {params.id}</h1>
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

export default VehicleCard;