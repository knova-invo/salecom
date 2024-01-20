import { Show } from 'solid-js';
import { reviewer } from '../../utils/constants';
import Role from './Role';
import MatchHome from './MatchHome';

function MatchReviewer(props) {
	const { role } = Role;

	return (
		<Show when={role() === reviewer} fallback={<MatchHome />} keyed>
			{props.children}
		</Show>
	);
}

export default MatchReviewer;
