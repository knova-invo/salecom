import { Show, children, createEffect, createResource, lazy } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { client, getRole } from '../../clients/client';
import Role from './Role';

const Login = lazy(() => import('../../pages/Login'));

function ProtectedRoutes(props) {
	const [token] = createResource(client.getToken);
	const { setRole } = Role;
	const query = createQuery(() => getRole(token()));
	const c = children(() => props.children);

	createEffect(() => {
		if (query.isSuccess) {
			setRole(query.data.role.name);
		}
	});

	return (
		<Show when={token()} fallback={<Login />} keyed>
			{c()}
		</Show>
	);
}

export default ProtectedRoutes;
