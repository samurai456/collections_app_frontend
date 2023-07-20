import { createContext } from 'react'
import { ModalPopup } from '../components/modalPopup/modalPopup'
import { useState } from 'react'

const ModalContext = createContext();

function ModalProvider({children}){
    const [showModal, setShowModal] = useState(false);
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [modalBtn1, setModalBtn1] = useState({text: 'cancel', style: 'secondary', onClick: ()=>{}});
    const [modalBtn2, setModalBtn2] = useState({text: 'ok', style: 'primary', onClick: ()=>{}});

    return(
        <ModalContext.Provider value={{
            showModal, 
            setShowModal, 
            modalHeader, 
            setModalHeader, 
            modalBody,
            setModalBody,
            modalBtn1,
            setModalBtn1,
            modalBtn2,
            setModalBtn2,
        }}>
            {children}
            <ModalPopup />
        </ModalContext.Provider>
    )
}

export { ModalContext }
export { ModalProvider }