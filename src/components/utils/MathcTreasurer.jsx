import { Show } from 'solid-js';
import { treasurer } from '../../utils/constants';
import Role from './Role';
import MatchHome from './MatchHome';

function MathcTreasurer(props) {
	const { role } = Role;

	return (
		<Show when={role() === treasurer} fallback={<MatchHome />} keyed>
			{props.children}
		</Show>
	);
}

export default MathcTreasurer;
