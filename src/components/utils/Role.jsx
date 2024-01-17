import { createSignal, createRoot } from 'solid-js';

function createRole() {
	const [role, setRole] = createSignal('');
	return { role, setRole };
}

export default createRoot(createRole);
