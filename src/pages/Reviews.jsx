import { Match, Show, Switch, createSignal } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { A, useIsRouting } from '@solidjs/router';
import { FaSolidPlus } from 'solid-icons/fa';
import PaginationButton from '../components/buttons/PaginationButton';
import SearchInput from '../components/inputs/SearchInput';
import { NEW_CASES_PATH } from '../utils/path';
import Loading from './Loading';
import { getCountReviewsTable, getReviewsTable } from '../clients/review.client';
import ReviewsTable from '../components/tables/ReviewsTable';

function Reviews() {
	const isRouting = useIsRouting();
	const [page, setPage] = createSignal(1);
	const [search, setSearch] = createSignal('');

	const doSearch = search => {
		setSearch(search);
		setPage(1);
	};

	const reviews = createQuery(() => getReviewsTable(page(), search()));
	const countReviews = createQuery(() => getCountReviewsTable(search()));

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
					<SearchInput id='search-reviews' search={doSearch} />
				</div>
				<Switch>
					<Match
						when={reviews.isPending || reviews.isRefetching || countReviews.isPending || countReviews.isRefetching}
					>
						<Loading />
					</Match>
					<Match when={reviews.isError || countReviews.isError}>
						<div>Error</div>
					</Match>
					<Match when={reviews.isSuccess && countReviews.isSuccess}>
						<div class='w-full md:w-1/2 md:mx-auto'>
							<ReviewsTable reviews={reviews.data} />
							<PaginationButton page={page()} setPage={setPage} count={countReviews.data[0].countDistinct.id} />
						</div>
					</Match>
				</Switch>
			</div>
		</Show>
	);
}
export default Reviews;
