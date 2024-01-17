import { For, createMemo } from 'solid-js';
import dayjs from 'dayjs';

/**
 *
 * @param {Object} props
 * @param {Object} props.client
 * @returns
 */
function ClientCard(props) {
	const data = createMemo(() => {
		return [
			{ key: 'Fecha de registro', value: dayjs(props.client.date_created).format('DD/MM/YYYY') },
			{ key: 'Color', value: props.client.color.nombre },
			{ key: 'Marca', value: props.client.marca.nombre },
			{ key: 'Modelo', value: props.client.modelo },
			{ key: 'Nombre', value: props.client.nombre },
			{ key: 'Cedula', value: props.client.cedula },
			{ key: 'Teléfono', value: props.client.telefono },
			{ key: 'Correo', value: props.client.correo },
		];
	});

	return (
		<div class='mt-2 bg-white rounded-md shadow-md p-4 text-center'>
			<h1 class='text-2xl font-bold'>Cliente {props.client.id}</h1>
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
export default ClientCard;
