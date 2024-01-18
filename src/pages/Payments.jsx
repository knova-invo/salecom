import { Match, Show, Switch, createSignal } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { useIsRouting } from '@solidjs/router';
import { getCountPaymentsTable, getPaymentsTable } from '../clients/case.client';
import PaginationButton from '../components/buttons/PaginationButton';
import PaymentsTable from '../components/tables/PaymentsTable';
import SearchInput from '../components/inputs/SearchInput';
import Loading from './Loading';

function Payments() {
	const isRouting = useIsRouting();

	const [page, setPage] = createSignal(1);
	const [search, setSearch] = createSignal('');

	const payments = createQuery(() => getPaymentsTable(page(), search()));
	const countPayments = createQuery(() => getCountPaymentsTable(search()));

	const doSearch = search => {
		setPage(1);
		setSearch(search);
	};

	return (
		<Show when={!isRouting()}>
			<div className='flex-1 max-w-full'>
				<SearchInput id='payments-cases' search={doSearch} />
				<Switch>
					<Match
						when={payments.isPending || payments.isRefetching || countPayments.isPending || countPayments.isRefetching}
					>
						<Loading />
					</Match>
					<Match when={payments.isError || countPayments.isError}>
						<div>Error</div>
					</Match>
					<Match when={payments.isSuccess && countPayments.isSuccess}>
						<PaymentsTable payments={payments.data} />
						<PaginationButton page={page()} setPage={setPage} count={countPayments.data[0].countDistinct.id} />
					</Match>
				</Switch>
			</div>
		</Show>
	);
}

export default Payments;
