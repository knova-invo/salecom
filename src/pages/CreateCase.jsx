import { ErrorBoundary, Match, Switch } from 'solid-js';
import { IoArrowBackOutline } from 'solid-icons/io';
import { createQuery } from '@tanstack/solid-query';
import { useNavigate } from '@solidjs/router';
import CreateCaseForm from '../components/forms/CreateCaseForm';
import { getClientsIds } from '../clients/client.client';
import { getServices } from '../clients/case.client';
import Loading from './Loading';

function CreateCase() {
	const clients = createQuery(getClientsIds);
	const services = createQuery(getServices);
	const navigate = useNavigate();
	const handleBack = () => navigate(-1);

	return (
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
			<ErrorBoundary fallback={(err, reset) => reset()}>
				<Switch>
					<Match when={clients.isPending || services.isPending || clients.isRefetching || services.isRefetching}>
						<Loading />
					</Match>
					<Match when={clients.isError || services.isError}>
						<div>Error</div>
					</Match>
					<Match when={clients.isSuccess && services.isSuccess}>
						<CreateCaseForm clients={clients.data} services={services.data} />
					</Match>
				</Switch>
			</ErrorBoundary>
		</div>
	);
}
export default CreateCase;
