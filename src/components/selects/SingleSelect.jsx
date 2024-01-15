import { Select, createOptions } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css';
import './styles/singleSelect.css';

/**
 *
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.labelOption
 * @param {String} props.id
 * @param {String} props.placeholer
 * @param {String} props.emptyPlaceholder
 * @param {String} props.error
 * @param {Array<>} props.options
 * @param {Function} props.setValue
 * @returns
 */
function SingleSelect(props) {
	const options = createOptions(props.options, { key: props.labelOption });

	return (
		<div class='w-full'>
			<label class='font-semibold' htmlFor={props.id}>
				{props.label}
			</label>
			<Select
				{...options}
				id={props.id}
				placeholder={props.placeholer}
				emptyPlaceholder={props.emptyPlaceholder}
				onChange={selected => {
					props.setValue(selected || null);
				}}
				class='custom'
			/>

			{props.error && <div class={'text-sm  text-red-600'}>{props.error}</div>}
		</div>
	);
}
export default SingleSelect;
