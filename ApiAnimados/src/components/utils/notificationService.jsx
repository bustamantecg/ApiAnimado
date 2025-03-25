// utils/notificationService.js
import { toast } from 'react-toastify';

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
/*
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
*/
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // Cierra automáticamente en 3 segundos
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
