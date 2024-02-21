import { Show, createEffect, createResource, lazy } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { client, getRole, logOut } from '../../clients/client';
import Role from './Role';
import { useNavigate } from '@solidjs/router';

const Login = lazy(() => import('../../pages/Login'));

function ProtectedRoutes(props) {
	const [token] = createResource(client.getToken);
	const navigate = useNavigate();
	const { setRole } = Role;
	const query = createQuery(() => getRole(token()));

	createEffect(() => {
		if (query.isSuccess) {
			setRole(query.data.role.name);
		} else if (query.isError) {
			if (query.error.errors[0].extensions.code === 'INVALID_CREDENTIALS') {
				logOut().then(res => navigate('/login'));
			}
		}
	});

	return (
		<Show when={token()} fallback={<Login />}>
			{props.children}
		</Show>
	);
}

export default ProtectedRoutes;
