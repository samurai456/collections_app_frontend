import { Modal, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { ThemeContext } from '../../../../contexts/themeContext';
import { LangContext } from '../../../../contexts/langContext';
import { FilterModalBody } from './filterModalBody';

function FilterModal({ 
    setNameFilter,
    nameFilter,
    fields, 
    showModal, 
    setShowModal, 
    updateCollection, 
    requestForItems,
    handleClearAllFilters
}){
    const { l } = useContext(LangContext)
    const {ti, t} = useContext(ThemeContext)

    const handleClose = () => setShowModal(false)
    return(
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton className={t()}>
            </Modal.Header>
            <Modal.Body className={ti()}>
                <FilterModalBody 
                    setNameFilter={setNameFilter}
                    nameFilter={nameFilter}
                    updateCollection={updateCollection} 
                    fields={fields} 
                />
            </Modal.Body>
            <Modal.Footer className={ti()}>
                <Button variant="primary" onClick={handleClose}>
                    {l('Close','Закрыть')}
                </Button>
                <Button 
                    variant="primary" 
                    onClick={()=>{
                        setShowModal(false)
                        handleClearAllFilters()
                    }}>
                    {l('Cancel all','Отменить все')}
                </Button>
                <Button 
                    variant="primary" 
                    onClick={()=>{
                        requestForItems()
                        setShowModal(false)
                    }}
                >
                    {l('Apply','Применить')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { FilterModal }