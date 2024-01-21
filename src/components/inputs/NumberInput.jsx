import { createMemo } from 'solid-js';

function NumberInput(props) {
	const getValue = createMemo(prevValue => (!Number.isNaN(props.value) ? props.value : prevValue));

	return (
		<div>
			<label class='font-semibold' htmlFor={props.id}>
				{props.label}
			</label>
			<input
				{...props}
				id={props.id}
				required={props.required}
				placeholder={props.placeholder}
				aria-invalid={props.error}
				class={
					props.error
						? 'w-full p-2 border text-sm border-gray-300 rounded-md outline-none ring-1 ring-red-600 transition-colors duration-300'
						: 'w-full p-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300'
				}
				type='number'
				value={getValue()}
			/>
			{props.error && <div class={'text-sm  text-red-600'}>{props.error}</div>}
		</div>
	);
}

export default NumberInput;
