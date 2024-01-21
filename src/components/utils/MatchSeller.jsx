import { Show } from 'solid-js';
import { seller } from '../../utils/constants';
import MatchHome from './MatchHome';
import Role from './Role';

function MatchSeller(props) {
	const { role } = Role;

	return (
		<Show when={role() === seller} fallback={<MatchHome />} keyed>
			{props.children}
		</Show>
	);
}

export default MatchSeller;
