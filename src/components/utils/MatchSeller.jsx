import { Show, children } from 'solid-js';
import { admin, seller } from '../../utils/constants';
import MatchHome from './MatchHome';
import Role from './Role';

function MatchSeller(props) {
	const { role } = Role;
	const c = children(() => props.children);

	return (
		<Show when={role() === seller || role() === admin} fallback={<MatchHome />}>
			{c()}
		</Show>
	);
}
export default MatchSeller;
