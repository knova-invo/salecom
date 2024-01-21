import { useIsRouting, useNavigate, useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { IoArrowBackOutline } from 'solid-icons/io';
import { Match, Show, Switch } from 'solid-js';
import CreatePayoutForm from '../components/forms/CreatePayoutForm';
import CreatePayoutCard from '../components/cards/CreatePayoutCard';
import { getPayout } from '../clients/payout.client';
import Loading from './Loading';

function CreatePayout() {
	const params = useParams();
	const review = createQuery(() => getPayout(params.id));
	const isRouting = useIsRouting();
	const navigate = useNavigate();
	const handleBack = () => navigate(-1);

	return (
		<Show when={!isRouting()}>
			<div class='flex-1 flex flex-col'>
				<div class='md:w-1/2 md:mx-auto'>
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
					<Match when={review.isPending || review.isRefetching}>
						<Loading />
					</Match>
					<Match when={review.isError}>
						<div>Error</div>
					</Match>
					<Match when={review.isSuccess}>
						<Show when={!review.data.pago}>
							<div class='md:w-1/2 md:mx-auto md:flex md:justify-between'>
								<CreatePayoutForm />
								<CreatePayoutCard payout={review.data} />
							</div>
						</Show>
					</Match>
				</Switch>
			</div>
		</Show>
	);
}

export default CreatePayout;
