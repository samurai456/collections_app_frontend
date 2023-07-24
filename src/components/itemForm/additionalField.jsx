import { useContext } from 'react';
import { ThemeContext } from '../../contexts/themeContext'

function AdditionalField({name, type, options, val, updateCollection}){
    const {ti} = useContext(ThemeContext)
    
    const updaterFunc = val => draft =>{
        draft.itemFields.find(i=>i.name===name).val = val
    }
    let field;
    if(type === 'number'){
        field = <input 
            type="number"
            className={"form-control fs-5"+ti()}
            value={val}
            onChange={e=>updateCollection(updaterFunc(e.target.value))}
        />
    }
    if(type === 'string'){
        field = <input 
            className={"form-control fs-5"+ti()}
            value={val}
            onChange={e=>{
                if(e.target.value.length <= 40){
                    updateCollection(updaterFunc(e.target.value))
                }
            }}
        />
    }
    if(type === 'text'){
        field = <textarea 
            className={"form-control fs-5"+ti()}
            value={val}
            onChange={e=>updateCollection(updaterFunc(e.target.value))}
        />
    }
    if(type === 'checkbox'){
        field = <input
            className={"form-check-input"+ti()}
            type="checkbox"
            checked={val}
            onChange={e=>updateCollection(updaterFunc(e.target.checked))}
        />
    }
    if(type === 'options'){
        field = <select
            value={val}
            className={"form-select text-center fs-5"+ti()}
            onChange={e=>updateCollection(updaterFunc(e.target.value))}
        >
            {options.map(i=>(
                <option key={i}>{i}</option>
            ))}
        </select>
    }
    if(type === 'date'){
        field = <input
            className={"form-control"+ti()}
            type="date"
            value={val}
            lang="en-US"
            onChange={e=>updateCollection(updaterFunc(e.target.value))}
        />
    }
    const labelStyle='col-xl-3 col-lg-3 col-md-3 col-auto text-end align-self-center';
    return(
        <>
            <div className={labelStyle}>{name}: </div>
            <div className="col-xl-7 col-lg-8 col-md-9">
                {field}
            </div>
        </>
    )
}

export { AdditionalField }