import { useNavigate } from '@solidjs/router';
import ErrorAlert from '../components/alerts/ErrorAlert';
import Button from '../components/buttons/Button';
import { LOGIN_PATH } from '../utils/path';
import { logOut } from '../clients/client';

function Logout() {
	const navigate = useNavigate();

	const handleBack = () => navigate(-1);

	const handleLogOut = () => {
		logOut()
			.then(res => navigate(LOGIN_PATH))
			.catch(err => ErrorAlert('Error al cerrar sesión'));
	};

	return (
		<div class='flex-1 px-8 flex'>
			<div class='flex m-auto text-center flex-col items-center justify-center gap-4 p-8 bg-white rounded-md border border-gray-100 shadow-md'>
				<p class='text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500'>Cerrar Sesión</p>
				<p class='text-gray-500 pb-4 border-b-2'>Estás a punto de cerrar sesión</p>
				<div>
					<Button onClick={handleLogOut} class='flex items-center justify-center w-full text-white'>
						<span>Cerrar sesión</span>
					</Button>
					<Button variant='error' onClick={handleBack} class='flex items-center justify-center w-full text-white mt-4'>
						<span>Cancelar</span>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Logout;
