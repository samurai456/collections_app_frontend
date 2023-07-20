import { useContext } from "react"
import { LangContext } from "../../contexts/langContext"

function TableHead(){
    const {l} = useContext(LangContext)
    return(
        <thead>
            <tr>
                <th>{l('Name','Название')}</th>
                <th>{l('Collection','Коллекция')}</th>
                <th>{l('Author','Автор')}</th>
            </tr>
        </thead>
    )
}

export { TableHead }