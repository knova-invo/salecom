import BarNav from '../navs/BarNav';

function NavContainer(props) {
	return (
		<>
			<main class='flex-1 m-2 overflow-auto flex'>{props.children}</main>
			<nav class='relative bottom-0'>
				<BarNav />
			</nav>
		</>
	);
}

export default NavContainer;
