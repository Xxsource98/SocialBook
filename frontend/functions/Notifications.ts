import { toast, ToastOptions } from 'react-toastify'

const ToastOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 7500,
    closeOnClick: true,
    closeButton: true,
}

export const NotificationDefault = (message: string) => {
    return toast.info(message, ToastOptions)
}

export const NotificationError = (message: string) => {
    return toast.error(`Error: ${message}`, ToastOptions)
}

export const NotificationSuccess = (message: string) => {
    return toast.success(message, ToastOptions)
}
