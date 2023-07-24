import { useContext } from "react"
import { LangContext } from "../../../../contexts/langContext"

function OptionsFilter({field, updateCollection}){
    const {l} = useContext(LangContext)
    return (
        <div>
            {field.name}
            <select
                value={field.filt}
                className={"form-select text-center fs-5"}
                onChange={e=>updateCollection(draft=>{
                    draft.itemFields.find(i=>i.key===field.key)
                        .filt = e.target.value
                })}
            >
                <option value="">{l('any','любое')}</option>
                {field.options.map(i=>(
                    <option key={i}>{i}</option>
                ))}
            </select>
        </div>
    )
}

export {OptionsFilter}