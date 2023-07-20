import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LangContext } from '../../contexts/langContext'

function ItemDetails({item}){
    const { l} = useContext(LangContext)
    const fields = item.collection.itemFields

    const st =  'col-auto align-self-center '
    return(
        <div className="px-5">
            <div className="fs-5 mt-3 border p-3 px-4 rounded">
                <div className="row">
                    <div className={st}>{l('Item title','Название айтема')}: </div>
                    <div className={st}><b>{item.name}</b></div>
                </div>
                <div className="row">
                    <div className={st}>{l('From collection','Из коллекции')}: </div>
                    <div className={st}>
                        <Link to={`/collection/${item.collection._id}`}><b>{item.collection.name}</b></Link>
                    </div>
                </div>
                <div className="row">
                    <div className={st}>{l('Author','Автор')}: </div>
                    <div className={st}>
                        <Link to={`/user-collections/${item.author._id}`}><b>{item.author.nickname}</b></Link>
                    </div>
                </div>
                <div className="row">
                    <div className={st}>{l('Tags','Теги')}:</div>
                    <div className={st}>
                        {item.tags && item.tags.length?
                            item.tags?.map(i=>
                                <Link
                                    to={`/items-by-tag/${i._id}`}
                                    key={i._id}
                                    className="btn btn-info ms-1 mt-1 rounded-pill"
                                >
                                    {i.name}
                                </Link>
                            ) :
                            l('No tags','Тегов нет')
                        }
                    </div>
                </div>
                {fields
                    .filter(i=>item['__'+i.name] || typeof item['__'+i.name] === 'boolean')
                    .map(i=>(
                        <div className="row" key={i.name}>
                            <div className={st}>{i.name}: </div>
                            <div className={st}>
                                <b>
                                    {i.type!=='checkbox'?
                                        item['__'+i.name]:
                                        (item['__'+i.name]?l('yes','да'):l('no','нет'))
                                    }
                                </b>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
}

export { ItemDetails }