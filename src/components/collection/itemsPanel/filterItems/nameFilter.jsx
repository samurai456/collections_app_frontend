import { useContext } from "react"
import { LangContext } from "../../../../contexts/langContext"

function NameFilter({nameFilter, setNameFilter}){
    const {l} = useContext(LangContext)
    return (
        <div>
            {l('Name', 'Название')}
            <div className="col-12">
                <input
                    placeholder={l('contains','содержит')}
                    className="form-control"
                    value={nameFilter.filt}
                    onChange={e=>setNameFilter(o=>({...o, filt: e.target.value}))}
                />
            </div>
        </div>
    )
}

export {NameFilter}