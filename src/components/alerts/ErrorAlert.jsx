import toast from 'solid-toast';

/**
 *
 * @param {String} text
 * @returns
 */
const ErrorAlert = (text = 'Hubo un error') => toast.error(text, { duration: 3000, position: 'top-center' });

export default ErrorAlert;
