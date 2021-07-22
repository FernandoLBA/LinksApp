import { toast } from 'react-toastify';

export const notify = (message, type) => toast( message, {
     type: type,
     position: 'top-left',
     autoClose: 2000
} );