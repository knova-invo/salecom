import { createForm, valiForm } from '@modular-forms/solid';
import { Select, createOptions } from '@thisbeyond/solid-select';
import { createSignal } from 'solid-js';
import '@thisbeyond/solid-select/style.css';
import TextInput from '../inputs/TextInput';
import { clientSellerSchema } from '../../schemas/clientSchema';
import Button from '../buttons/Button';

function CreateClientForm() {
	const selectOpt = createOptions(['apple', 'banana', 'pear', 'pineapple', 'kiwi']);

	const [valueSelect, setValueSelect] = createSignal();
	const [_, { Form, Field }] = createForm({
		validate: valiForm(clientSellerSchema),
		initialValues: { id: '', modelo: '' },
	});

	const handleSubmit = (data, event) => {
		event.preventDefault();
		console.log(valueSelect());
		console.log(data);
	};

	return (
		<Form class='flex-1 w-full max-h-[85vh] m-auto overflow-auto md:m-auto md:w-2/5 xl:w-1/4' onSubmit={handleSubmit}>
			<div class='flex flex-col justify-center gap-4 p-4 mx-1 my-4 bg-white border-gray-100 shadow-md rounded-md border'>
				<h1 class='text-center text-2xl font-bold'>Añadir Cliente</h1>
				<Field name='id'>
					{(field, props) => (
						<TextInput
							placeholder='correo@gmail.com'
							label='Placa'
							id='id-field'
							error={field.error}
							value={field.value}
							{...props}
						/>
					)}
				</Field>
				<Select
					class='custom'
					emptyPlaceholder='Sin opciones'
					{...selectOpt}
					onChange={selected => {
						setValueSelect(selected);
					}}
				/>
				<div>error</div>
				<Field name='modelo'>
					{(field, props) => (
						<TextInput
							placeholder='correo@gmail.com'
							type='number'
							label='Modelo'
							id='modelo-field'
							error={field.error}
							value={field.value}
							{...props}
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
export default CreateClientForm;
