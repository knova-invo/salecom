import { useIsRouting, useNavigate, useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { IoArrowBackOutline } from 'solid-icons/io';
import { Match, Show, Switch } from 'solid-js';
import VehicleCard from '../components/cards/VehicleCard';
import { getVehicle } from '../clients/vehicle.client';
import Loading from './Loading';

function Vehicle() {
	const params = useParams();
	const vehicle = createQuery(() => getVehicle(params.id));
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
					<Match when={vehicle.isPending || vehicle.isRefetching}>
						<Loading />
					</Match>
					<Match when={vehicle.isError}>
						<div>Error</div>
					</Match>
					<Match when={vehicle.isSuccess}>
						<VehicleCard vehicle={vehicle.data} />
					</Match>
				</Switch>
			</div>
		</Show>
	);
}

export default Vehicle;
