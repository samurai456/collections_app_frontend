import { Modal, Button } from 'react-bootstrap'
import { ModalContext } from '../../contexts/modalContext'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/themeContext'

function ModalPopup(){
    const {t, ti} = useContext(ThemeContext)
    const { 
        showModal, 
        setShowModal, 
        modalHeader, 
        modalBody, 
        modalBtn1, 
        modalBtn2 
    } = useContext(ModalContext);

    const handleClose = () => setShowModal(false)
    return(
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header className={t()} closeButton>
                <Modal.Title>{modalHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={ti()}>{modalBody}</Modal.Body>
            <Modal.Footer className={ti()}>
                <Button variant={modalBtn1.style||'secondary'} onClick={modalBtn1.onClick||(()=>{})}>
                    {modalBtn1.text||'cancel'}
                </Button>
                <Button variant={modalBtn2.style||'primary'} onClick={modalBtn2.onClick||(()=>{})}>
                    {modalBtn2.text||'yes'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { ModalPopup }