import { Navigate } from '@solidjs/router';
import { Match, Switch } from 'solid-js';
import { CASES_PATH, LOGOUT_PATH, PAYOUTS_PATH, REVIEWS_PATH } from '../../utils/path';
import { admin, reviewer, seller, treasurer } from '../../utils/constants';
import Loading from '../../pages/Loading';
import Role from './Role';

function MatchHome() {
	const { role } = Role;

	return (
		<Switch fallback={<Loading />}>
			<Match when={role() === seller}>
				<Navigate href={CASES_PATH} />
			</Match>
			<Match when={role() === reviewer}>
				<Navigate href={REVIEWS_PATH} />
			</Match>
			<Match when={role() === treasurer}>
				<Navigate href={PAYOUTS_PATH} />
			</Match>
			<Match when={role() === admin}>
				<Navigate href={LOGOUT_PATH} />
			</Match>
		</Switch>
	);
}

export default MatchHome;
