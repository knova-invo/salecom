import { Show } from 'solid-js';
import { seller } from '../../utils/constants';
import Role from './Role';
import MatchHome from './MatchHome';

function MatchSeller(props) {
	const { role } = Role;

	return (
		<Show when={role() === seller} fallback={<MatchHome />} keyed>
			{props.children}
		</Show>
	);
}

export default MatchSeller;
