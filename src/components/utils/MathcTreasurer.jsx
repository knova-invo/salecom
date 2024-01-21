import { Show } from 'solid-js';
import { treasurer } from '../../utils/constants';
import MatchHome from './MatchHome';
import Role from './Role';

function MathcTreasurer(props) {
	const { role } = Role;

	return (
		<Show when={role() === treasurer} fallback={<MatchHome />} keyed>
			{props.children}
		</Show>
	);
}

export default MathcTreasurer;
