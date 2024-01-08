import create from 'solid-zustand';

export const roleStore = create(set => ({
	role: '',
	setRole: role => set(state => ({ role })),
}));
