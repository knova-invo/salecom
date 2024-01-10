import { Show, children } from 'solid-js';
import { admin, seller } from '../../utils/constants';
import { roleStore } from '../../stores/userStore';
import MatchHome from './MatchHome';

function MatchSeller(props) {
	const role = roleStore();
	const c = children(() => props.children);

	return (
		<Show when={role.role === seller || role.role === admin} fallback={<MatchHome />}>
			{c()}
		</Show>
	);
}
export default MatchSeller;
