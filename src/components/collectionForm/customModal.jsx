import { Modal, Button } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { ToastContext } from '../../contexts/toastContext'
import { ThemeContext } from '../../contexts/themeContext';
import { LangContext } from '../../contexts/langContext';

function CustomModal({ setFields, field, showModal, setShowModal }){
    const { l } = useContext(LangContext)
    const [option, setOption] = useState('');
    const {setToastText, setShowToast} = useContext(ToastContext);
    const {ti, t} = useContext(ThemeContext)

    function handleAddOption(){
        if(field.options.includes(option)){
            setToastText(
                l('this option is already included',
                'эта опция уже в списке')
            );
            setShowToast(true);
            return
        }
        if(!option){
            setToastText(
                l('fill an empty field',
                'заполните пустое поле')
            );
            setShowToast(true);
            return
        }
        setFields(o=>o.map(i=> 
            i.key===field.key? 
                {...i, options:[...i.options, option]}: 
                {...i}
        ))
        setOption('');
    }

    function handleDeleteOption(option){
        setFields(o=>o.map(i=>(i.key===field.key)?
            {...i, options: i.options.filter(i=>i!==option)}:
            {...i}            
        ));
    }

    const handleClose = () => setShowModal(false)
    return(
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton className={t()}>
                <span className="h4">
                    {l('Customize options field', 'Настройте поле опций')}
                </span>
            </Modal.Header>
            <Modal.Body className={ti()}>
                {field.options.map(i=>(
                    <div key={i} className="d-flex mb-1 border-bottom">
                        <span className="flex-grow-1">{i}</span>
                        <button
                            onClick={()=>handleDeleteOption(i)}
                            className="btn btn-danger"
                        >
                            X
                        </button>
                    </div>
                ))}
                <div className="d-flex">
                    <div className="flex-grow-1 me-1">
                        <input 
                            value={option}
                            onChange={e=>setOption(e.target.value)}
                            className={"form-control"+ti()} 
                            placeholder="option"
                        />
                    </div>
                    <button 
                        className="btn btn-primary col-auto"
                        onClick={handleAddOption}
                    >
                        {l('Add option','Добавить опцию')}
                    </button>
                </div>
            </Modal.Body>
            <Modal.Footer className={ti()}>
                <Button variant="primary" onClick={handleClose}>
                    {l('Close','Закрыть')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { CustomModal }