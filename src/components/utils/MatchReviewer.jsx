import { Show } from 'solid-js';
import { reviewer } from '../../utils/constants';
import MatchHome from './MatchHome';
import Role from './Role';

function MatchReviewer(props) {
	const { role } = Role;

	return (
		<Show when={role() === reviewer} fallback={<MatchHome />} keyed>
			{props.children}
		</Show>
	);
}

export default MatchReviewer;
