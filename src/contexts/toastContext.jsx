import { createContext, useState } from 'react'
import { CustomToast } from '../components/customToast/customToast'

const ToastContext = createContext();

function ToastProvider({children}){
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState('');

    return(
        <ToastContext.Provider 
            value={{ showToast, setShowToast, toastText, setToastText }}
        >
            <CustomToast />
            { children }
        </ToastContext.Provider>
    )
}

export { ToastContext }
export { ToastProvider }