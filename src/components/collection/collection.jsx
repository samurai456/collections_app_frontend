import { CollectionDetails } from './collectionDetails/collectionDetails'
import { ItemsPanel } from './itemsPanel/itemsPanel'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { backend } from '../../config'
import loadingGif from '../adminPanel/static/loading.gif'
import { useModalDelete } from '../../customHooks/useModalDelete'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function Collection(){
    const {l} = useContext(LangContext)
    const { request } = useContext(RequestContext)
    const navigate = useNavigate()
    const { collectionId } = useParams()
    const [ collection, setCollection ] = useState('loading')
    const setModal = useModalDelete()

    function requestCollection(){
        const cb = res =>{
            if(!res.collection) return navigate('/')
            setCollection(res.collection)
        }
        fetch(`${backend}/api/collection/${collectionId}`)
            .then(a=>a.json())
            .then(cb)
    }

    useEffect(()=>requestCollection(), [])

    function handleDeleteCollection(){
        const cb = res =>{
            if(res.type==='success'){
                return navigate(`/user-collections/${collection.author._id}`)
            }
        }
        const onDeleteClick = ()=>{
            setCollection('loading')
            request(
                `${backend}/api/collection/${collectionId}`, 
                'delete', 
                cb
            )
        }
        setModal(
            l(
                `Do you want to delete collection named "${collection.name}" ?`, 
                `Вы хотите удалить коллекцию "${collection.name}" ?`
            ), 
            onDeleteClick
        )
    }

    if(collection === 'loading'){
        return (
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    return(
        <div className="m-4 d-flex flex-column">
            <CollectionDetails 
                collection={collection} 
                handleDelete={handleDeleteCollection}
            />
            <b className="fs-4 align-self-center my-4">
                {l('Collection items', 'Айтемы коллекции')}
            </b>
            <ItemsPanel 
                fields={collection.itemFields} 
                collectionId={collectionId}
                authorId={collection.author._id}
            />
        </div>
    )
}

export { Collection }