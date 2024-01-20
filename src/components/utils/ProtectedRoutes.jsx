import { Show, createEffect, createResource, lazy } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { client, getRole } from '../../clients/client';
import Role from './Role';

const Login = lazy(() => import('../../pages/Login'));

function ProtectedRoutes(props) {
	const [token] = createResource(client.getToken);
	const { role, setRole } = Role;
	const query = createQuery(() => getRole(token()));

	createEffect(() => {
		if (query.isSuccess) {
			setRole(query.data.role.name);
		}
	});

	createEffect(() => {
		console.log(role());
	});

	return (
		<Show when={token()} fallback={<Login />}>
			{props.children}
		</Show>
	);
}

export default ProtectedRoutes;
