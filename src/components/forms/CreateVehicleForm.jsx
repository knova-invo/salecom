import { createForm, setValue, valiForm } from '@modular-forms/solid';
import { useNavigate } from '@solidjs/router';
import { vehicleSellerSchema } from '../../schemas/clientSchema';
import { createVehicle } from '../../clients/vehicle.client';
import SingleSelect from '../selects/SingleSelect';
import SuccessAlert from '../alerts/SuccesAlert';
import NumberInput from '../inputs/NumberInput';
import ErrorAlert from '../alerts/ErrorAlert';
import TextInput from '../inputs/TextInput';
import Button from '../buttons/Button';

/**
 *
 * @param {Object} props
 * @param {Array} props.colors
 * @param {Array} props.brands
 * @returns
 */
function CreateVehicleForm(props) {
	const navigate = useNavigate();
	const [form, { Form, Field }] = createForm({
		validate: valiForm(vehicleSellerSchema),
		initialValues: { id: '', color: 0, marca: 0, modelo: undefined },
	});

	const handleBack = () => navigate(-1);

	const handleSubmit = (data, event) => {
		event.preventDefault();
		const upperData = { ...data, id: data.id.toUpperCase() };
		createVehicle(upperData)
			.then(res => {
				SuccessAlert('Creado con éxito');
				handleBack();
			})
			.catch(err => {
				if (err.errors[0].extensions.code === 'RECORD_NOT_UNIQUE') {
					return ErrorAlert('Placa ya registrada');
				}
				return ErrorAlert('Error al guardar');
			});
	};

	return (
		<Form class='flex-1 w-full max-h-[85dvh] m-auto overflow-auto md:m-auto md:w-2/5 xl:w-1/4' onSubmit={handleSubmit}>
			<div class='flex flex-col justify-center gap-4 p-4 mx-1 my-4 bg-white border-gray-100 shadow-md rounded-md border'>
				<h1 class='text-center text-2xl font-bold'>Añadir Vehículo</h1>
				<Field name='id'>
					{(field, props) => (
						<TextInput
							placeholder='ABC·123'
							label='Placa'
							id='id-field'
							autocomplete='off'
							error={field.error}
							value={field.value}
							{...props}
						/>
					)}
				</Field>
				<Field name='color'>
					{field => (
						<SingleSelect
							id='color-field'
							options={props.colors}
							labelOption='nombre'
							disabled={option => field.value === option.value.id}
							label='Color'
							error={field.error}
							placeholer='Selecciona el color'
							emptyPlaceholder='No existe'
							setValue={value => setValue(form, 'color', value ? value.id : 0)}
						/>
					)}
				</Field>
				<Field name='marca'>
					{field => (
						<SingleSelect
							id='marca-field'
							disabled={option => field.value === option.value.id}
							options={props.brands}
							labelOption='nombre'
							label='Marca'
							error={field.error}
							placeholer='Selecciona la marca'
							emptyPlaceholder='No existe'
							setValue={value => setValue(form, 'marca', value ? value.id : 0)}
						/>
					)}
				</Field>
				<Field name='modelo' type='number'>
					{(field, props) => (
						<NumberInput
							placeholder='2024'
							label='Modelo'
							id='modelo-field'
							error={field.error}
							value={field.value}
							{...props}
						/>
					)}
				</Field>
				<Button type='submit' variant='success'>
					Crear vehículo
				</Button>
			</div>
		</Form>
	);
}

export default CreateVehicleForm;
