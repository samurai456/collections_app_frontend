import { useContext } from "react"
import { LangContext } from "../../../../contexts/langContext"

function StringFilter({field, updateCollection}){
    const {l} = useContext(LangContext)
    return (
        <div>
            {field.name}
            <div className="col-12">
                <input
                    placeholder={l('contains', 'содержит')}
                    className="form-control"
                    value={field.filt}
                    onChange={e=>updateCollection(draft=>{
                        draft.itemFields.find(i=>i.key===field.key)
                            .filt = e.target.value
                    })}
                />
            </div>
        </div>
    )
}

export {StringFilter}