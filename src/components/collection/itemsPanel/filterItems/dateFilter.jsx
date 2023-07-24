import { useContext } from "react"
import { LangContext } from "../../../../contexts/langContext"

function DateFilter({field, updateCollection}){
    const {l} = useContext(LangContext)
    return (
        <div>
            {field.name}
            <div className="row">
                <div className="col-6">
                    <input
                        placeholder={l('from', 'начиная с')}
                        className="form-control"
                        value={field.filt.from}
                        onChange={e=>updateCollection(draft=>{
                            draft.itemFields.find(i=>i.key===field.key)
                                .filt.from = e.target.value
                        })}
                        type="date" 
                    />
                </div>
                <div className="col-6">
                    <input
                        placeholder={l("to", 'До')}
                        className="form-control"
                        value={field.filt.to}
                        onChange={e=>updateCollection(draft=>{
                            draft.itemFields.find(i=>i.key===field.key)
                                .filt.to = e.target.value
                        })}
                        type="date" 
                    />
                </div>
            </div>
        </div>
    )
}

export {DateFilter}