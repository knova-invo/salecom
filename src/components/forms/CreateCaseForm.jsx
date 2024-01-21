import { createForm, setValue, valiForm } from '@modular-forms/solid';
import { A, useNavigate } from '@solidjs/router';
import { createCase } from '../../clients/case.client';
import { caseSchema } from '../../schemas/caseSchema';
import { NEW_VEHICLES_PATH } from '../../utils/path';
import SingleSelect from '../selects/SingleSelect';
import SuccessAlert from '../alerts/SuccesAlert';
import ErrorAlert from '../alerts/ErrorAlert';
import Button from '../buttons/Button';

/**
 *
 * @param {Object} props
 * @param {Array} props.vehicles
 * @param {Array} props.services
 * @returns
 */
function CreateCaseForm(props) {
	const navigate = useNavigate();

	const [form, { Form, Field }] = createForm({
		validate: valiForm(caseSchema),
		initialValues: { vehiculo: '', servicios: [] },
	});

	const handleBack = () => navigate(-1);

	const handleSubmit = data => {
		const formatData = {
			...data,
			servicios: {
				create: data.servicios.map(item => ({
					casos_id: '+',
					servicios_id: { id: item },
				})),
			},
		};

		createCase(formatData)
			.then(res => {
				SuccessAlert('Creado con éxito');
				handleBack();
			})
			.catch(err => ErrorAlert('Error al guardar'));
	};

	return (
		<Form class='flex-1 w-full max-h-[85dvh] m-auto overflow-auto md:m-auto md:w-2/5 xl:w-1/4' onSubmit={handleSubmit}>
			<div class='flex flex-col justify-center p-4 mx-1 my-4 bg-white border-gray-100 shadow-md rounded-md border'>
				<h1 class='text-center text-2xl font-bold mb-4'>Añadir Caso</h1>
				<Field name='vehiculo'>
					{field => (
						<SingleSelect
							id='vehiculo-field'
							options={props.vehicles}
							value={field.value}
							disabled={option => field.value === option.label}
							labelOption='id'
							label='Vehículo'
							error={field.error}
							placeholer='Selecciona un vehículo'
							emptyPlaceholder='No existe'
							setValue={value => setValue(form, 'vehiculo', value ? value.id : '')}
						/>
					)}
				</Field>
				<A href={NEW_VEHICLES_PATH} class='ml-auto text-sm font-semibold text-blue-600'>
					Crear un nuevo vehículo
				</A>
				<Field name='servicios'>
					{field => (
						<SingleSelect
							multiple
							disabled={option => field.value.includes(option.value.id)}
							id='servicios-field'
							options={props.services}
							labelOption='nombre'
							label='Servicios'
							error={field.error}
							placeholer='Selecciona un vehículo'
							emptyPlaceholder='No existe'
							setValue={value => setValue(form, 'servicios', value ? value.map(item => item.id) : [])}
						/>
					)}
				</Field>
				<Button type='submit' variant='success' class='mt-4'>
					Crear Caso
				</Button>
			</div>
		</Form>
	);
}

export default CreateCaseForm;
