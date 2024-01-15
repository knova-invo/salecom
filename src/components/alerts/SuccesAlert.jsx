import toast from 'solid-toast';

/**
 *
 * @param {String} text
 * @returns
 */
const SuccessAlert = (text = 'Finalizado con éxito') => toast.success(text, { duration: 3000, position: 'top-center' });

export default SuccessAlert;
