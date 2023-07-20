import loadingGif from '../adminPanel/static/loading.gif'
import Select from 'react-select/creatable'
import { ToastContext } from '../../contexts/toastContext'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdditionalField } from './additionalField'
import { backend } from '../../config'
import { ThemeContext } from '../../contexts/themeContext'
import { LangContext } from '../../contexts/langContext'

function ItemForm({
    collection, 
    updateCollection, 
    handleItemData, 
    tags, 
    setTags, 
    itemName,
    setItemName,
    buttonText
}){
    const navigate = useNavigate()
    const { l } = useContext(LangContext)
    const {ti} = useContext(ThemeContext)
    const { setShowToast, setToastText } = useContext(ToastContext)
    const [ showEmpty, setShowEmpty ] = useState(false);
    const [ tagOptions, setTagOptions ] = useState()
    const [ tag, setTag ] = useState('')

    function handleClick(){
        setShowEmpty(true)
        if(!itemName){
            setShowToast(true)
            setToastText('fill "item title" field')
            return
        }
        handleItemData(getItemData())
    }

    function handleInputChange(val){
        setTag(val)
        setTagOptions([])
        if(!val) return
        fetch(`${backend}/api/tag/by-start/${val}`)
            .then(a=>a.json())
            .then(r=>setTagOptions(r.tags.map(i=>({value: i.name, label: i.name}))))
    }

    function getItemData(){
        return {
            itemName,
            itemTags: tags,
            ...collection.itemFields.reduce(
                (accum, i)=>({...accum, ['__'+i.name]: i.val})
            , {})
        }
    }
   
    if(collection === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }

    const labelStyle='col-xl-3 col-lg-3 col-md-3 col-auto text-end align-self-center';
    return(
        <div className="m-2 mt-4 row fs-5" >
            <div className="row mb-4 justify-content-end">
                <button
                    onClick={()=>navigate(-1)}
                    className="btn btn-primary col-auto p-3 px-4"
                >
                    {l('Go back', 'Назад')}
                </button>
            </div>
            <div className="row p-0 m-0 mb-3">
                <div className={labelStyle}>{l('Item title','Название айтема')}: </div>
                <div className="col-xl-7 col-lg-8 col-md-9">
                    <input
                        value={itemName}
                        onChange={e=>setItemName(e.target.value)}
                        className={"form-control fs-5"+ti() + (showEmpty&&!itemName? ' is-invalid': '') } 
                    />
                </div>
            </div>
            <div className="row p-0 m-0 mb-3">
                <div className={labelStyle}>{l('Tags','Теги')}: </div>
                <div className="col-xl-7 col-lg-8 col-md-9 pe-0 row">
                    <div className="col-12 col-sm pe-0 me-0 mb-1">
                        <Select
                            placeholder=""
                            defaultValue={tags.map(i=>({value: i, label: i}))}
                            onChange={vals=>setTags(vals.map(i=>i.value))} 
                            isMulti
                            onInputChange={handleInputChange}
                            inputValue={tag}
                            options={tagOptions}
                            classNamePrefix={ti()}
                        />
                    </div>
                </div>
            </div>
            {
                collection.itemFields.map(i=>(
                    <div key={i.name+i.type+i.options.join('')} className="row p-0 m-0 mb-3">
                        <AdditionalField 
                            {...i}
                            updateCollection={updateCollection} 
                        />
                    </div>
                ))
            }
            <div className="row justify-content-end">
                <button 
                    className="btn btn-primary col-auto fs-5 px-4 py-2"
                    onClick={handleClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export { ItemForm }