import { useContext } from 'react'
import { ModalContext } from '../contexts/modalContext'
import { LangContext } from '../contexts/langContext'

function useModalDelete(){
    const { setShowModal, setModalBody, setModalBtn1, setModalBtn2 } = useContext(ModalContext)
    const { l} = useContext(LangContext)

    const setModal = (text, onDeleteClick) =>{
        setShowModal(true);
        setModalBody(text);
        setModalBtn1({text: l('Cancel','Отмена'), style: 'primary', onClick: ()=>setShowModal(false) })
        setModalBtn2({text: l('Delete','Удалить'), style: 'danger', onClick: ()=>{
            onDeleteClick()
            setShowModal(false)
        }});
    }

    return setModal
}

export { useModalDelete }