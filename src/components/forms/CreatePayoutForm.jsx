import { createForm, valiForm } from '@modular-forms/solid';
import { useNavigate, useParams } from '@solidjs/router';
import dayjs from 'dayjs';
import { createPayout } from '../../clients/payout.client';
import { payoutSchema } from '../../schemas/payoutSchema';
import SuccessAlert from '../alerts/SuccesAlert';
import { PAYOUTS_PATH } from '../../utils/path';
import ErrorAlert from '../alerts/ErrorAlert';
import TextInput from '../inputs/TextInput';
import Button from '../buttons/Button';

function CreatePayoutForm() {
	const navigate = useNavigate();
	const params = useParams();
	const [, { Form, Field }] = createForm({
		validate: valiForm(payoutSchema),
		initialValues: { referencia: '' },
	});

	const handleSubmit = data => {
		const payout = { pago: dayjs().format('YYYY-MM-DD HH:MM'), ...data };
		createPayout(params.id, payout)
			.then(res => {
				SuccessAlert('Pago realizado con éxito');
				navigate(PAYOUTS_PATH);
			})
			.catch(err => ErrorAlert());
	};

	return (
		<Form class='md:w-3/5 xl:w-2/4' onSubmit={handleSubmit}>
			<div class='flex flex-col justify-center gap-6 p-8 m-4 bg-white rounded-md border border-gray-100 shadow-md'>
				<h1 class='text-center text-2xl font-bold'>Registrar Pago</h1>
				<Field name='referencia'>
					{(field, props) => (
						<TextInput
							placeholder='ABCVAS123213'
							label='Referencia de pago'
							id='referencia-field'
							autoComplete='true'
							error={field.error}
							required
							value={field.value}
							{...props}
						/>
					)}
				</Field>
				<Button variant='success' type='submit'>
					Pagar
				</Button>
			</div>
		</Form>
	);
}
export default CreatePayoutForm;
