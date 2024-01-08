import { splitProps } from 'solid-js';

/**
 *
 * @param {Object} props
 * @param {String} props.placeholder
 * @param {Boolean} props.required
 * @param {String} props.label
 * @param {String} props.error
 * @param {String} props.type
 * @param {String} props.id
 * @returns
 */
function TextInput(props) {
	const [local, others] = splitProps(props, ['placeholder', 'label', 'type', 'error', 'id', 'required']);

	return (
		<div className='w-full'>
			<label class='font-semibold' htmlFor={local.id}>
				{local.label}
			</label>
			<input
				{...others}
				id={local.id}
				type={local.type}
				required={local.required}
				placeholder={local.placeholder}
				aria-invalid={local.error}
				class={
					local.error
						? 'w-full p-2 border text-sm border-gray-300 rounded-md outline-none ring-1 ring-red-600 transition-colors duration-300'
						: 'w-full p-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300'
				}
			/>
			{local.error && <div class={'text-sm  text-red-600'}>{local.error}</div>}
		</div>
	);
}
export default TextInput;
