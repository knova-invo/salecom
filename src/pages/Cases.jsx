import { Match, Show, Switch, createSignal } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { A, useIsRouting } from '@solidjs/router';
import { FaSolidPlus } from 'solid-icons/fa';
import { getCasesTable, getCountCasesTable } from '../clients/case.client';
import PaginationButton from '../components/buttons/PaginationButton';
import SearchInput from '../components/inputs/SearchInput';
import CasesTable from '../components/tables/CasesTable';
import { NEW_CASES_PATH } from '../utils/path';
import Loading from './Loading';

function Cases() {
	const isRouting = useIsRouting();
	const [page, setPage] = createSignal(1);
	const [search, setSearch] = createSignal('');

	const doSearch = search => {
		setPage(1);
		setSearch(search);
	};

	const cases = createQuery(() => getCasesTable(page(), search()));
	const countCases = createQuery(() => getCountCasesTable(search()));

	return (
		<Show when={!isRouting()}>
			<div class='flex-1 max-w-full'>
				<div class='w-full md:w-1/2 md:mx-auto md:flex gap-4 justify-between'>
					<div class='fixed bottom-20 z-30 right-2 md:static'>
						<A
							href={NEW_CASES_PATH}
							class='bg-blue-500 flex items-center gap-1 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-700/40 ripple-bg-blue-200 text-white rounded-full font-bold py-2 px-4 shadow-lg'
						>
							<span>Añadir Caso</span>
							<FaSolidPlus size={22} />
						</A>
					</div>
					<SearchInput id='search-cases' search={doSearch} />
				</div>
				<Switch>
					<Match when={cases.isPending || cases.isRefetching || countCases.isPending || countCases.isRefetching}>
						<Loading />
					</Match>
					<Match when={cases.isError || countCases.isError}>
						<div>Error</div>
					</Match>
					<Match when={cases.isSuccess && countCases.isSuccess}>
						<div class='w-full md:w-1/2 md:mx-auto'>
							<CasesTable cases={cases.data} />
							<PaginationButton page={page()} setPage={setPage} count={countCases.data[0].countDistinct.id} />
						</div>
					</Match>
				</Switch>
			</div>
		</Show>
	);
}

export default Cases;
