import { useIsRouting, useNavigate, useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { IoArrowBackOutline } from 'solid-icons/io';
import { Match, Show, Switch } from 'solid-js';
import PaymentCard from '../components/cards/PaymentCard';
import { getPayment } from '../clients/case.client';
import Loading from './Loading';

function Payment() {
	const params = useParams();
	const payment = createQuery(() => getPayment(params.id));
	const isRouting = useIsRouting();
	const navigate = useNavigate();
	const handleBack = () => navigate(-1);

	return (
		<Show when={!isRouting()}>
			<div class='flex-1 flex flex-col'>
				<div>
					<button
						onClick={handleBack}
						type='button'
						class='flex justify-center text-white gap-1 items-center bg-orange-400 shadow-orange-400/20 hover:bg-orange-600 hover:shadow-orange-600/40 ripple-bg-orange-200 rounded-full font-bold px-4 py-2 shadow-lg'
					>
						<IoArrowBackOutline size={22} />
						<span>Volver</span>
					</button>
				</div>
				<Switch>
					<Match when={payment.isPending || payment.isRefetching}>
						<Loading />
					</Match>
					<Match when={payment.isError}>
						<div>Error</div>
					</Match>
					<Match when={payment.isSuccess}>
						<PaymentCard payment={payment.data} />
					</Match>
				</Switch>
			</div>
		</Show>
	);
}
export default Payment;
