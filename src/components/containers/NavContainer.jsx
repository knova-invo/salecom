import { children } from 'solid-js';
import BarNav from '../navs/BarNav';

function NavContainer(props) {
	const c = children(() => props.children);

	return (
		<>
			<main class='flex-1 m-2 overflow-auto flex'>{c()}</main>
			<nav class='relative bottom-0'>
				<BarNav />
			</nav>
		</>
	);
}

export default NavContainer;
