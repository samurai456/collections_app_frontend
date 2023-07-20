import { backend } from '../../config'
import { ItemsTable } from '../itemsTable/itemsTable'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react' 
import loadingGif from '../adminPanel/static/loading.gif'
import { LangContext } from '../../contexts/langContext'

function ItemsByTag(){
    const { l } = useContext(LangContext)
    const { tagId } = useParams()
    const [items, setItems] = useState('loading')
    const [tag, setTag] = useState('loading')

    useEffect(()=>{
        const cb = res =>{
            setTag(res.tag)
            setItems(res.items)
        }
        fetch(`${backend}/api/item/items-by-tag/${tagId}`)
            .then(a=>a.json())
            .then(cb)
    }, [])

    if(tag === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    return(
        <div className="pb-5">
            <div className="row justify-content-center pt-3 w-100 m-0">
                <div className="col-10 py-3 h3">{l('Items with tag','Айтемы с тегом')} "{tag.name}"</div>
                <ItemsTable items={items} />
            </div>
        </div>
    )
}

export { ItemsByTag }