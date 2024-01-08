import { children } from 'solid-js';
import BarNav from '../navs/BarNav';

function NavContainer(props) {
	const c = children(() => props.children);

	return (
		<>
			<div class='flex-1'>{c()}</div>
			<div class='relative bottom-0'>
				<BarNav />
			</div>
		</>
	);
}

export default NavContainer;
