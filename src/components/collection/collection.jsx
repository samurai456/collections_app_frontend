import { CollectionDetails } from './collectionDetails/collectionDetails'
import { ItemsPanel } from './itemsPanel/itemsPanel'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { useImmer } from 'use-immer'
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
    const [ collection, updateCollection ] = useImmer('loading')
    const setModal = useModalDelete()

    function requestCollection(){
        const cb = res =>{
            if(!res.collection) return navigate('/')
            res.collection.itemFields = res.collection.itemFields.map(i=>addFilter(i))
            updateCollection(res.collection)
        }
        fetch(`${backend}/api/collection/${collectionId}`)
            .then(a=>a.json())
            .then(cb)
    }

    function addFilter(field){
        if(field.type==='number') return {...field, filt: {min: '', max: ''}}
        if(field.type==='date') return {...field, filt: {from: '', to: ''}}
        return {...field, filt: ''}
    }

    useEffect(()=>requestCollection(), [])

    function handleDeleteCollection(){
        const cb = res =>{
            if(res.type==='success'){
                return navigate(`/user-collections/${collection.author._id}`)
            }
        }
        const onDeleteClick = ()=>{
            updateCollection('loading')
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
                addFilter={addFilter}
                collection={collection}
                updateCollection={updateCollection}
            />
        </div>
    )
}

export { Collection }