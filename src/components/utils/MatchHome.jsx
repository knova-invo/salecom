import { Navigate } from '@solidjs/router';
import Loading from '../../pages/Loading';
import { Match, Switch } from 'solid-js';
import { admin, seller } from '../../utils/constants';
import { CASES_PATH } from '../../utils/path';
import Role from './Role';

function MatchHome() {
	const { role } = Role;

	return (
		<Switch fallback={<Loading />}>
			<Match when={role() === admin}>
				<Navigate href={CASES_PATH} end={true} />
			</Match>
			<Match when={role() === seller}>
				<Navigate href={CASES_PATH} end={true} />
			</Match>
		</Switch>
	);
}
export default MatchHome;
