import { Match, Show, Switch, createSignal } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { A, useIsRouting } from '@solidjs/router';
import { FaSolidPlus } from 'solid-icons/fa';
import { getVehiclesTable, getCountVehiclesTable } from '../clients/vehicle.client';
import PaginationButton from '../components/buttons/PaginationButton';
import VehiclesTable from '../components/tables/VehiclesTable';
import SearchInput from '../components/inputs/SearchInput';
import { NEW_VEHICLES_PATH } from '../utils/path';
import Loading from './Loading';

function Vehicles() {
	const isRouting = useIsRouting();
	const [page, setPage] = createSignal(1);
	const [search, setSearch] = createSignal('');

	const doSearch = search => {
		setSearch(search);
		setPage(1);
	};

	const vehicles = createQuery(() => getVehiclesTable(page(), search()));
	const countVehicles = createQuery(() => getCountVehiclesTable(search()));

	return (
		<Show when={!isRouting()}>
			<div className='flex-1 max-w-full'>
				<div class='w-full md:w-1/2 md:mx-auto md:flex gap-4 justify-between'>
					<div class='fixed bottom-20 z-30 right-2 md:static'>
						<A
							href={NEW_VEHICLES_PATH}
							class='bg-blue-500 justify-center flex items-center gap-1 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-700/40 ripple-bg-blue-200 text-white rounded-full font-bold py-2 px-4 shadow-lg'
						>
							<span>Añadir Vehículo</span>
							<FaSolidPlus size={22} />
						</A>
					</div>
					<SearchInput id='search-clients' search={doSearch} />
				</div>
				<Switch>
					<Match
						when={vehicles.isPending || vehicles.isRefetching || countVehicles.isPending || countVehicles.isRefetching}
					>
						<Loading />
					</Match>
					<Match when={vehicles.isError || countVehicles.isError}>
						<div>Error</div>
					</Match>
					<Match when={vehicles.isSuccess && countVehicles.isSuccess}>
						<div class='w-full md:w-1/2 md:mx-auto'>
							<VehiclesTable vehicles={vehicles.data} />
							<PaginationButton page={page()} setPage={setPage} count={countVehicles.data[0].countDistinct.id} />
						</div>
					</Match>
				</Switch>
			</div>
		</Show>
	);
}

export default Vehicles;
