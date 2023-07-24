import { CheckboxFilter } from "./checkboxFilter"
import { DateFilter } from "./dateFilter"
import { NameFilter } from "./nameFilter"
import { NumberFilter } from "./numberFilter"
import { OptionsFilter } from "./optionsFilter"
import { StringFilter } from "./stringFilter"

function FilterModalBody({fields, updateCollection, setNameFilter, nameFilter}){
    const filterComps = fields.map(i=>{
        const props = {field: i, updateCollection, key: i.key}
        if(i.type==='number') return <NumberFilter {...props}/>
        if(['string', 'text', 'name'].includes(i.type)) return <StringFilter {...props}/>
        if(i.type==='date') return <DateFilter {...props}/>
        if(i.type==='checkbox') return <CheckboxFilter {...props} />
        if(i.type==='options') return <OptionsFilter {...props} />
    })
    return [
        <NameFilter 
            key="name"
            setNameFilter={setNameFilter} 
            nameFilter={nameFilter} 
        />, 
        ...filterComps
    ]
}

export { FilterModalBody }