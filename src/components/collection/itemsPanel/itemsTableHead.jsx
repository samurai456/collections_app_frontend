import { useContext } from "react"
import { LangContext } from "../../../contexts/langContext"

function ItemsTableHead({fields, items, setItems, showCRUBButtons}){
    const { l } = useContext(LangContext)
    return(
        <thead>
            <tr>
                {showCRUBButtons &&
                    <th className="text-center">
                        <input 
                            disabled={!items.length}
                            checked={items.length&&items.every(i=>i.checked)}
                            onChange={e=>setItems(
                                items.map(i=>({...i, checked: e.target.checked}))
                            )}
                            type="checkbox" 
                        />
                    </th>
                }
                <th>{l('Name','Название')}</th>
                {fields.map(i=>(
                    <th key={i.name}>{i.name}</th>
                ))}
                {showCRUBButtons && <th></th>}
            </tr>
        </thead>
    )
}

export { ItemsTableHead }