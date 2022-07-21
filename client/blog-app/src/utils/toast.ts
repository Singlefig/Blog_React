import { toast } from 'react-toastify';

const getToast = (type: 'success' | 'warning' | 'error', message: string) => {
    return toast[type](message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

export { getToast };