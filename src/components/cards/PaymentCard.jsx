import { useParams } from '@solidjs/router';
import { For, createMemo } from 'solid-js';
import dayjs from 'dayjs';

/**
 *
 * @param {Object} props
 * @param {Object} props.payment
 * @returns
 */
function PaymentCard(props) {
	const params = useParams();
	const data = createMemo(() => {
		return [
			{ key: 'Comisión', value: props.payment.comision },
			{
				key: 'Fecha de pago',
				value: props.payment.date_created ? dayjs(props.payment.date_created).format('DD/MM/YYYY') : '',
			},
			{
				key: 'Fecha de registro',
				value: props.payment.date_created ? dayjs(props.payment.date_created).format('DD/MM/YYYY') : '',
			},
			{ key: 'ID del Caso', value: params.id },
			{ key: 'Cliente del caso', value: props.payment.cliente },
			{ key: 'Referencia de pago', value: props.payment.referencia },
		];
	});
	return (
		<div class='mt-2 bg-white rounded-md shadow-md p-4 text-left'>
			<h1 class='text-2xl font-bold px-2'>Detalles de pago</h1>
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

export default PaymentCard;
