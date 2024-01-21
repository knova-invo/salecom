import { createForm, valiForm } from '@modular-forms/solid';
import { useNavigate, useParams } from '@solidjs/router';
import dayjs from 'dayjs';
import { createReview } from '../../clients/review.client';
import { reviewSchema } from '../../schemas/reviewSchema';
import SuccessAlert from '../alerts/SuccesAlert';
import NumberInput from '../inputs/NumberInput';
import { REVIEWS_PATH } from '../../utils/path';
import ErrorAlert from '../alerts/ErrorAlert';
import Button from '../buttons/Button';

function CreateReviewForm() {
	const navigate = useNavigate();
	const params = useParams();
	const [, { Form, Field }] = createForm({
		validate: valiForm(reviewSchema),
		initialValues: { comision: Number.NaN },
	});

	const handleSubmit = data => {
		const review = { diagnostico: dayjs().format('YYYY-MM-DD HH:MM'), ...data };
		createReview(params.id, review)
			.then(res => {
				SuccessAlert('Diagnóstico realizado con éxito');
				navigate(REVIEWS_PATH);
			})
			.catch(err => ErrorAlert());
	};

	return (
		<Form class='md:w-3/5 xl:w-2/4' onSubmit={handleSubmit}>
			<div class='flex flex-col justify-center gap-6 p-8 m-4 bg-white rounded-md border border-gray-100 shadow-md'>
				<h1 class='text-center text-2xl font-bold'>Registrar Diagnóstico</h1>
				<Field name='comision' type='number'>
					{(field, props) => (
						<NumberInput
							placeholder='2024'
							label='Comisión'
							id='comision-field'
							error={field.error}
							value={field.value}
							{...props}
						/>
					)}
				</Field>
				<Button type='submit'>Pagar</Button>
			</div>
		</Form>
	);
}
export default CreateReviewForm;
