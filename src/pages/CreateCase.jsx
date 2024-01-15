import { IoArrowBackOutline } from 'solid-icons/io';
import { createForm } from '@modular-forms/solid';
import { useNavigate } from '@solidjs/router';

function CreateCase() {
	const navigate = useNavigate();
	const [_, { Form, Field }] = createForm();

	const handleBack = () => navigate(-1);

	return (
		<div className='flex-1'>
			<button
				onClick={handleBack}
				type='button'
				class='bg-orange-500 flex justify-center gap-1 items-center shadow-orange-500/20 hover:bg-orange-700 hover:shadow-orange-700/40 ripple-bg-orange-200 text-white rounded-full font-bold p-2 shadow-lg'
			>
				<IoArrowBackOutline size={22} />
				<span>Volver</span>
			</button>
			<Form class='my-auto md:m-auto md:w-2/5 xl:w-1/4'>
				<div class='flex flex-col justify-center gap-6 p-8 m-4 bg-white rounded-md border border-gray-100 shadow-xl'>
					<h1 class='text-center text-2xl font-bold'>Inicio de sesión</h1>
				</div>
			</Form>
		</div>
	);
}
export default CreateCase;
