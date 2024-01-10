import { Navigate } from '@solidjs/router';
import Loading from '../../pages/Loading';
import { Match, Switch } from 'solid-js';
import { admin, seller } from '../../utils/constants';
import { roleStore } from '../../stores/userStore';
import { CASES_PATH } from '../../utils/path';

function MatchHome() {
	const role = roleStore();

	return (
		<Switch fallback={<Loading />}>
			<Match when={role.role === admin}>
				<Navigate href={CASES_PATH} end={true} />
			</Match>
			<Match when={role.role === seller}>
				<Navigate href={CASES_PATH} end={true} />
			</Match>
		</Switch>
	);
}
export default MatchHome;
