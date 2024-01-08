import { Show, Switch, children, createEffect, createResource, lazy } from 'solid-js';
import { client, getRole } from '../../clients/client';
import { createQuery } from '@tanstack/solid-query';
import { roleStore } from '../../stores/userStore';

const Login = lazy(() => import('../../pages/Login'));

function ProtectedRoutes(props) {
	const [token] = createResource(client.getToken);
	const role = roleStore();
	const query = createQuery(() => getRole(token()));
	const c = children(() => props.children);

	createEffect(() => {
		if (query.isSuccess) {
			role.setRole(query.data?.role?.name || '');
		}
	});

	return (
		<Show when={token()} fallback={<Login />} keyed>
			{c()}
		</Show>
	);
}

export default ProtectedRoutes;
