import { children, splitProps } from 'solid-js';

const mode = {
	info: 'bg-blue-500 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-700/40 ripple-bg-blue-100',
	warning: 'bg-orange-400 shadow-orange-400/20 hover:bg-orange-600 hover:shadow-orange-600/40 ripple-bg-orange-100',
	error: 'bg-red-400 shadow-red-400/20 hover:bg-red-600 hover:shadow-red-600/40 ripple-bg-red-100',
	success:
		'bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-600/40 ripple-bg-emerald-100',
};

/**
 *
 * @param {Object} props
 * @param {String} props.class
 * @param {String} props.type
 * @param {'info' | 'warning' | 'error' | 'success'} props.variant
 * @param {Boolean} props.disabled
 * @returns
 */
function Button(props) {
	const [local, others] = splitProps(props, ['children', 'class', 'type', 'variant']);
	const c = children(() => local.children);
	return (
		<button
			{...others}
			type={local.type || 'button'}
			disabled={local.disabled}
			class={`py-3 px-6 over:shadow-lg  ${local.class} text-white font-sans text-xs font-bold uppercase shadow-md ${
				mode[local.variant] || mode.info
			} transition-all duration-150 focus:shadow-none
             disabled:pointer-events-none disabled:bg-slate-300 disabled:opacity-50 disabled:shadow-none rounded-md `}
		>
			{c()}
		</button>
	);
}
export default Button;
