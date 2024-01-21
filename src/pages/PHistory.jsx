import { Match, Show, Switch, createSignal } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { useIsRouting } from '@solidjs/router';
import { getCountPayoutsHisTable, getPayoutsHisTable } from '../clients/payout.client';
import PaginationButton from '../components/buttons/PaginationButton';
import PHistoryTable from '../components/tables/PHistoryTable';
import SearchInput from '../components/inputs/SearchInput';
import Loading from './Loading';

function PHistory() {
	const isRouting = useIsRouting();
	const [page, setPage] = createSignal(1);
	const [search, setSearch] = createSignal('');

	const doSearch = search => {
		setSearch(search);
		setPage(1);
	};

	const payouts = createQuery(() => getPayoutsHisTable(page(), search()));
	const countPayouts = createQuery(() => getCountPayoutsHisTable(search()));

	return (
		<Show when={!isRouting()}>
			<div class='flex-1 max-w-full'>
				<div class='w-full md:w-1/2 md:mx-auto md:flex gap-4 justify-end'>
					<SearchInput id='search-reviews' search={doSearch} />
				</div>
				<Switch>
					<Match
						when={payouts.isPending || payouts.isRefetching || countPayouts.isPending || countPayouts.isRefetching}
					>
						<Loading />
					</Match>
					<Match when={payouts.isError || countPayouts.isError}>
						<div>Error</div>
					</Match>
					<Match when={payouts.isSuccess && countPayouts.isSuccess}>
						<div class='w-full md:w-1/2 md:mx-auto'>
							<PHistoryTable payouts={payouts.data} />
							<PaginationButton page={page()} setPage={setPage} count={countPayouts.data[0].countDistinct.id} />
						</div>
					</Match>
				</Switch>
			</div>
		</Show>
	);
}
export default PHistory;
