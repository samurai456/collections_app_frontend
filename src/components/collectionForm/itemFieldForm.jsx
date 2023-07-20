import { useState, useContext } from 'react'
import { CustomModal } from './customModal'
import { ThemeContext } from '../../contexts/themeContext'
import settingsIcon from '../adminPanel/static/settings.png'
import { LangContext } from '../../contexts/langContext'

function ItemFieldForm({ field, fields, setFields, showEmpty }){
    const { l } = useContext(LangContext)
    const {ti} = useContext(ThemeContext)
    const [showModal, setShowModal] = useState(false);

    function handleOptionsSettings(){
        setShowModal(true)
    }

    function handleTypeChange(e){
        if(e.target.value==='options') setShowModal(true)
        setFields(o=>o.map(i=>i.key===field.key?
            {...i, type: e.target.value}: {...i}
        ))
    }

    const isUnique = 1 === fields.reduce((accum, i)=>i.name === field.name? ++accum:accum , 0)
    return (
        <div className="row align-items-center border-top mb-3">
            <CustomModal 
                field={field} 
                setFields={setFields} 
                showModal={showModal} 
                setShowModal={setShowModal}
            />
            <div className="col-7 col-sm-4">
                <label className="control-label">
                    {l('Filed name', 'Название поля')}:
                </label>
                <input
                    value={field.name}
                    onChange={e=>
                        setFields(o=>o.map(i=>i.key===field.key?
                            {...i, name: e.target.value}:{...i}
                    ))}
                    className={"form-control fs-5"+ti() + ((showEmpty&&(!field.name||!isUnique)) ? ' is-invalid': '')}
                />
            </div>
            <div className="col-7 col-sm-4 order-sm-1 order-2">
                <label className="control-label">
                    {l('Type', 'Тип')}:
                </label>
                <select
                    className={"form-select text-center fs-5"+ti()}
                    value={field.type}
                    onChange={handleTypeChange}
                >
                    <option value="number">{l('number','число')}</option>
                    <option value="string">
                        {l('string (max 40 symbols)','строка (макс. 40 символов)')}
                    </option>
                    <option value="text">
                        {l('multiline text','многострочный текст')}
                    </option>
                    <option value="checkbox">{l('checkbox','чекбокс')}</option>
                    <option value="date">{l('date','дата')}</option>
                    <option value="options">{l('options','опции')}</option>
                </select>
            </div>
            {
                field.type === 'options'&&(
                    <div className="col-auto order-sm-2 order-3">
                        <button 
                            className={"btn btn-light" +  (showEmpty&&!field.options.length ? ' border-danger': '')} 
                            onClick={handleOptionsSettings}
                        >
                            <img src={settingsIcon} height={25} />
                        </button>
                    </div>
                )
            }
            <div className="col-auto order-sm-3 order-1">
                <button 
                    onClick={()=>{
                        setFields(o=>o.filter(i=>i.key!==field.key));
                    }}
                    className="btn btn-danger"
                >
                        X
                </button>
            </div>
        </div>
    )
}

export { ItemFieldForm }