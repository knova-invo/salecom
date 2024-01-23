import { useIsRouting, useNavigate } from '@solidjs/router';
import { IoArrowBackOutline } from 'solid-icons/io';
import { createQuery } from '@tanstack/solid-query';
import { Match, Switch } from 'solid-js';
import CreateVehicleForm from '../components/forms/CreateVehicleForm';
import { getBrands } from '../clients/vehicle.client';
import Loading from './Loading';

function CreateClient() {
	const brands = createQuery(getBrands);
	const navigate = useNavigate();
	const isRouting = useIsRouting();
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
					<Match when={brands.isPending || brands.isRefetching}>
						<Loading />
					</Match>
					<Match when={brands.isError}>
						<div>Error</div>
					</Match>
					<Match when={brands.isSuccess}>
						<CreateVehicleForm brands={brands.data} />
					</Match>
				</Switch>
			</div>
		</Show>
	);
}

export default CreateClient;
