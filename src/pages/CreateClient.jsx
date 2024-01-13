import { useNavigate } from '@solidjs/router';
import { IoArrowBackOutline } from 'solid-icons/io';
import './styles.css';
import CreateClientForm from '../components/forms/CreateClientForm';

function CreateClient() {
	const navigate = useNavigate();

	const handleBack = () => navigate(-1);

	return (
		<div class='flex-1 flex flex-col'>
			<div>
				<button
					onClick={handleBack}
					type='button'
					class='flex justify-center text-white gap-1 items-center bg-orange-400 shadow-orange-400/20 hover:bg-orange-600 hover:shadow-orange-600/40 ripple-bg-orange-100 rounded-full font-bold px-4 py-2 shadow-lg'
				>
					<IoArrowBackOutline size={22} />
					<span>Volver</span>
				</button>
			</div>
			<CreateClientForm />
		</div>
	);
}
export default CreateClient;
