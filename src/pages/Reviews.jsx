import { Match, Show, Switch, createSignal } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { useIsRouting } from '@solidjs/router';
import { getCountReviewsTable, getReviewsTable } from '../clients/review.client';
import PaginationButton from '../components/buttons/PaginationButton';
import ReviewsTable from '../components/tables/ReviewsTable';
import SearchInput from '../components/inputs/SearchInput';
import Loading from './Loading';

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
				<div class='w-full md:w-1/2 md:mx-auto md:flex gap-4 justify-end'>
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
