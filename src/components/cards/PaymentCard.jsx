import { useParams } from '@solidjs/router';
import { For, Show, createMemo, createSignal } from 'solid-js';
import dayjs from 'dayjs';
import { confirmPayment } from '../../clients/case.client';
import SuccessAlert from '../alerts/SuccesAlert';
import ErrorAlert from '../alerts/ErrorAlert';
import Button from '../buttons/Button';

/**
 *
 * @param {Object} props
 * @param {Object} props.payment
 * @returns
 */
function PaymentCard(props) {
	const params = useParams();
	const [payConfirm, setPayConfirm] = createSignal(props.payment?.recibido || false);

	const confirm = () => {
		confirmPayment(params.id)
			.then(res => {
				SuccessAlert('Confirmado realizado con éxito');
				setPayConfirm(true);
			})
			.catch(err => ErrorAlert());
	};

	const data = createMemo(() => {
		return [
			{ key: 'Comisión', value: props.payment.comision },
			{
				key: 'Pago',
				value: props.payment.date_created ? dayjs(props.payment.date_created).format('DD/MM/YYYY') : '',
			},
			{
				key: 'Registro',
				value: props.payment.date_created ? dayjs(props.payment.date_created).format('DD/MM/YYYY') : '',
			},
			{ key: 'ID del Caso', value: params.id },
			{ key: 'Vehículo del caso', value: props.payment.vehiculo },
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
			<div class='grid grid-cols-2 hover:bg-gray-50 space-y-0 p-2 border-b pt-6'>
				<p class='text-gray-600'>Recibido</p>
				<Show
					when={payConfirm()}
					fallback={
						<Button onClick={confirm} class='mx-auto ml-0'>
							Confirmar
						</Button>
					}
				>
					<p className='font-semibold'>Confirmado</p>
				</Show>
			</div>
		</div>
	);
}

export default PaymentCard;
