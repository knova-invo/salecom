import { createForm, setValue, valiForm } from '@modular-forms/solid';
import { useNavigate } from '@solidjs/router';
import { caseSchema } from '../../schemas/caseSchema';
import SingleSelect from '../selects/SingleSelect';
import Button from '../buttons/Button';

/**
 *
 * @param {Object} props
 * @param {Array} props.clients
 * @param {Array} props.services
 * @returns
 */
function CreateCaseForm(props) {
	const navigate = useNavigate();

	const [form, { Form, Field }] = createForm({
		validate: valiForm(caseSchema),
		initialValues: { cliente: '', servicios: [] },
	});

	const handleBack = () => navigate(-1);

	const handleSubmit = data => console.log(data);

	return (
		<Form class='flex-1 w-full max-h-[85vh] m-auto overflow-auto md:m-auto md:w-2/5 xl:w-1/4' onSubmit={handleSubmit}>
			<div class='flex flex-col justify-center gap-4 p-4 mx-1 my-4 bg-white border-gray-100 shadow-md rounded-md border'>
				<h1 class='text-center text-2xl font-bold'>Añadir Caso</h1>
				<Field name='cliente'>
					{field => (
						<SingleSelect
							id='cliente-field'
							options={props.clients}
							labelOption='id'
							label='Cliente'
							error={field.error}
							placeholer='Selecciona un cliente'
							emptyPlaceholder='No existe'
							setValue={value => setValue(form, 'cliente', value ? value.id : '')}
						/>
					)}
				</Field>
				<Field name='servicios'>
					{field => (
						<SingleSelect
							multiple
							id='servicios-field'
							options={props.services}
							labelOption='nombre'
							label='Servicios'
							error={field.error}
							placeholer='Selecciona un cliente'
							emptyPlaceholder='No existe'
							setValue={value => setValue(form, 'servicios', value ? value.map(item => item.id) : [])}
						/>
					)}
				</Field>
				<Button type='submit' variant='success'>
					Guardar cliente
				</Button>
			</div>
		</Form>
	);
}

export default CreateCaseForm;
