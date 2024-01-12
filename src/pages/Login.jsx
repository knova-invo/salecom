import { Show, createResource, createSignal } from 'solid-js';
import { createForm, valiForm } from '@modular-forms/solid';
import { Navigate, useNavigate } from '@solidjs/router';
import ErrorAlert from '../components/alerts/ErrorAlert';
import TextInput from '../components/inputs/TextInput';
import { loginSchema } from '../schemas/loginSchema';
import { client, signIn } from '../clients/client';
import { ROOT_REDIRECT_PATH } from '../utils/path';
import Button from '../components/buttons/Button';

function Login() {
	const navigate = useNavigate();
	const [token] = createResource(() => client.getToken());
	const [disabled, setDisable] = createSignal(false);
	const [_, loginForm] = createForm({ validate: valiForm(loginSchema), initialValues: { email: '', password: '' } });

	const handleSubmit = (data, event) => {
		event.preventDefault();
		setDisable(true);
		signIn(data.email, data.password)
			.then(() => navigate(ROOT_REDIRECT_PATH, { replace: true }))
			.catch(err => {
				setDisable(false);
				ErrorAlert('Revisa tu correo y contraseña');
			});
	};

	return (
		<Show when={!token()} fallback={<Navigate href={ROOT_REDIRECT_PATH} end={true} />}>
			<loginForm.Form class='my-auto md:m-auto md:w-2/5 xl:w-1/4' onSubmit={handleSubmit}>
				<div class='flex flex-col justify-center gap-6 p-8 m-4 bg-white rounded-md border border-gray-100 shadow-xl'>
					<h1 className='text-center text-2xl font-bold'>Inicio de sesión</h1>
					<loginForm.Field name='email'>
						{(field, props) => (
							<TextInput
								placeholder='correo@gmail.com'
								label='Correo'
								id='email-field'
								autoComplete='true'
								error={field.error}
								required
								value={field.value}
								{...props}
							/>
						)}
					</loginForm.Field>
					<loginForm.Field name='password'>
						{(field, props) => (
							<TextInput
								value={field.value}
								placeholder='*********'
								label='Contraseña'
								type='password'
								error={field.error}
								id='pass-field'
								autoComplete='true'
								required
								{...props}
							/>
						)}
					</loginForm.Field>
					<Button disabled={disabled()} type={'submit'}>
						Iniciar sesión
					</Button>
				</div>
			</loginForm.Form>
		</Show>
	);
}
export default Login;
