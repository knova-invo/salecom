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
	return (
		<div className='w-full'>
			<label class='font-semibold' htmlFor={props.id}>
				{props.label}
			</label>
			<input
				{...props}
				id={props.id}
				type={props.type}
				required={props.required}
				placeholder={props.placeholder}
				aria-invalid={props.error}
				class={
					props.error
						? 'w-full p-2 border text-sm border-gray-300 rounded-md outline-none ring-1 ring-red-600 transition-colors duration-300'
						: 'w-full p-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300'
				}
			/>
		</div>
	);
}

export default TextInput;
