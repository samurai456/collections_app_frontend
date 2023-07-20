import { backend } from '../../config'
import { LangContext } from '../../contexts/langContext'
import { ItemsTable } from '../itemsTable/itemsTable'
import { BiggestCollections } from './biggestCollections'
import { TagsCloud } from './tagsCloud'
import { useState, useEffect, useContext } from 'react'

function Main(){
    const {l} = useContext(LangContext)
    const [items, setItems] = useState('loading')

    useEffect(()=>{
        const cb = res => setItems(res.items)
        fetch(`${backend}/api/item/last10`)
            .then(a=>a.json())
            .then(cb)
    }, [])

    return(
        <div className="pb-5">
            <div className="row justify-content-center pt-3 w-100 m-0">
                <div className="col-10 py-3 h3">{l('Latest items','Последние айтемы')}</div>
                <ItemsTable items={items} />
                <div className="col-10 py-3 h3">{l('Biggest collections','Самые большие коллекции')}</div>
                <BiggestCollections />
                <div className="col-10 py-3 h3">{l('Tags cloud','Облако тегов')}</div>
                <TagsCloud />
            </div>
        </div>
    )
}

export { Main }