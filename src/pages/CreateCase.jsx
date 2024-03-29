import { useIsRouting, useNavigate } from '@solidjs/router';
import { IoArrowBackOutline } from 'solid-icons/io';
import { createQuery } from '@tanstack/solid-query';
import { Match, Show, Switch } from 'solid-js';
import CreateCaseForm from '../components/forms/CreateCaseForm';
import { getVehiclesIds } from '../clients/vehicle.client';
import { getServices } from '../clients/case.client';
import Loading from './Loading';

function CreateCase() {
	const vehicles = createQuery(getVehiclesIds);
	const services = createQuery(getServices);
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
					<Match when={vehicles.isPending || services.isPending || vehicles.isRefetching || services.isRefetching}>
						<Loading />
					</Match>
					<Match when={vehicles.isError || services.isError}>
						<div>Error</div>
					</Match>
					<Match when={vehicles.isSuccess && services.isSuccess}>
						<CreateCaseForm vehicles={vehicles.data} services={services.data} />
					</Match>
				</Switch>
			</div>
		</Show>
	);
}

export default CreateCase;
