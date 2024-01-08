import { Show, children, createResource, lazy } from 'solid-js';
import { client } from '../../clients/client';

const Login = lazy(() => import('../../pages/Login'));

function ProtectedRoutes(props) {
	const [token] = createResource(() => client.getToken());
	const c = children(() => props.children);

	return (
		<Show when={token()} fallback={<Login />} keyed>
			{c()}
		</Show>
	);
}

export default ProtectedRoutes;
