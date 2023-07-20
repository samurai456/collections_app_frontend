import { useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../contexts/themeContext'
import { backend } from '../../config'
import loadingGif from '../adminPanel/static/loading.gif'
import { ItemRow } from './itemRow'
import { LangContext } from '../../contexts/langContext'

function SearchResults(){
    const { l } = useContext(LangContext)
    const { t } = useContext(ThemeContext)
    const { searchingFor } = useParams()
    const [ items, setItems ] = useState('loading')
    
    useEffect(()=>{
        setItems('loading')
        fetch(`${backend}/api/item/search-for/${searchingFor}`)
            .then(a=>a.json())
            .then(r=>{
                r.searchResult.sort((a, b)=>b.textScore-a.textScore)
                setItems(r.searchResult)}
            )
    }, [searchingFor])

    if(items === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    return (
        <div className="p-4 ">
            {items.length?
                <div className="py-3 h3">{l('Results for','Результаты по поиску')} "{searchingFor}"</div> :
                <div className="py-3 h3">
                    {l(`No results for "${searchingFor}"`,`Поиск по "${searchingFor}" не дал результатов`)}
                </div>
            }
            {items.map(i=><ItemRow i={i} key={i._id+i.resultFrom}/>)}
        </div>
    )
}

export { SearchResults }