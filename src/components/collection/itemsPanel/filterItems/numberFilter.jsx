import { useContext } from "react"
import { LangContext } from "../../../../contexts/langContext"

function NumberFilter({field, updateCollection}){
    const {l} = useContext(LangContext)
    return(
        <div>
            {field.name}
            <div className="row">
                <div className="col-6">
                    <input
                        placeholder={l('min', 'минимальное')}
                        className="form-control"
                        value={field.filt.min}
                        onChange={e=>updateCollection(draft=>{
                            draft.itemFields.find(i=>i.key===field.key)
                                .filt.min = e.target.value
                        })}
                        type="number" 
                    />
                </div>
                <div className="col-6">
                    <input
                        placeholder={l('max', 'максимальное')}
                        className="form-control"
                        value={field.filt.max}
                        onChange={e=>updateCollection(draft=>{
                            draft.itemFields.find(i=>i.key===field.key)
                                .filt.max = e.target.value
                        })}
                        type="number"
                    />
                </div>
            </div>
        </div>
    )
}

export { NumberFilter }