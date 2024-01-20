import { Navigate } from '@solidjs/router';
import { Match, Switch } from 'solid-js';
import { admin, seller } from '../../utils/constants';
import { CASES_PATH, LOGOUT_PATH } from '../../utils/path';
import Loading from '../../pages/Loading';
import Role from './Role';

function MatchHome() {
	const { role } = Role;

	return (
		<Switch fallback={<Loading />}>
			<Match when={role() === seller}>
				<Navigate href={CASES_PATH} />
			</Match>
			<Match when={role() === admin}>
				<Navigate href={LOGOUT_PATH} />
			</Match>
		</Switch>
	);
}

export default MatchHome;
