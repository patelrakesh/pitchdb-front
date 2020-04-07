import swal from 'sweetalert';
import { toast, Zoom } from 'react-toastify';

const toastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  transition: Zoom
};

export default {
  success: (message) => {
    if (swal.getState().isOpen)
      swal.close();
    toast.success(message, toastOptions);
  },

  error: (message) => {
    if (swal.getState().isOpen)
      swal.close();
    toast.error(message, toastOptions);
  }
};