import { useContext } from "react"
import { LangContext } from "../../../../contexts/langContext"

function CheckboxFilter({field, updateCollection}){
    const {l} = useContext(LangContext)
    return (
        <div>
            {field.name}
            <div className="row ps-2">
                <button 
                    onClick={()=>updateCollection(draft=>{
                        draft.itemFields.find(i=>i.key===field.key)
                            .filt = true
                    })}
                    className={"col-auto btn btn-"+(!field.filt? 'light': 'info')}
                >
                    {l('Yes','Да')}
                </button>
                <button 
                    onClick={()=>updateCollection(draft=>{
                        draft.itemFields.find(i=>i.key===field.key)
                            .filt = false
                    })}
                    className={"col-auto mx-2 btn btn-"+(!field.filt && field.filt!==''? 'info': 'light')}
                >
                    {l('No', 'Нет')}
                </button>
                <button 
                    onClick={()=>updateCollection(draft=>{
                        draft.itemFields.find(i=>i.key===field.key)
                            .filt = ''
                    })}
                    className={"col-auto btn btn-"+(field.filt===''? 'info': 'light')}
                >
                    {l("Doesn't matter", 'Неважно')}
                </button>
            </div>
        </div>
    )
}

export {CheckboxFilter}