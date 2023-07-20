import { ItemForm } from '../itemForm/itemForm'
import { CollectionDetails } from '../collection/collectionDetails/collectionDetails'
import { useEffect, useContext, useState } from 'react'
import { useImmer } from 'use-immer'
import { useParams, useNavigate } from 'react-router-dom'
import loadingGif from '../adminPanel/static/loading.gif'
import { backend } from '../../config'
import { ToastContext } from '../../contexts/toastContext'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function CreateItem(){
    const { l } = useContext(LangContext)
    const navigate = useNavigate()
    const [ tags, setTags ] = useState([])
    const [ itemName, setItemName ] = useState('')
    const { collectionId } = useParams()
    const [ collection, updateCollection ] = useImmer()
    const [ loading, setLoading ] = useState(true)
    const { request } = useContext(RequestContext)
    const { setShowToast, setToastText } = useContext(ToastContext)

    useEffect(()=> requestForCollection(), [])

    function requestForCollection(){
        const cb = res =>{
            res.collection.itemFields = addValuesToFields(res.collection.itemFields)
            updateCollection(res.collection)
            setLoading(false)
        }
        fetch(`${backend}/api/collection/${collectionId}`)
            .then(a=>a.json())
            .then(cb)
    }

    function addValuesToFields(itemFields){
        return itemFields.map(i=>{
            const field = collection?.itemFields?.find(
                x=>i.name+i.type+i.options.join('/')===x.name+x.type+x.options.join('/')
            )
            if(field) return field
            if(i.type==='options') return { ...i, val: i.options[0] }
            if(i.type==='checkbox') return { ...i, val: false }
            return { ...i, val: '' }
        })
    }

    function createItem(item){
        setLoading(true)
        const cb = res => {
            if(res.type === 'additional-fields-404') {
                setShowToast(true)
                setToastText(res.msg)
                requestForCollection()
            }
            if(res.type === 'item-creation-success') navigate(`/item/${res.itemId}`)
        }
        request(
            `${backend}/api/item/${collectionId}`, 
            'post',  
            cb, 
            item
        )
    }

    if(loading){
        return (
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    return(
        <div className='p-4'>
            <CollectionDetails 
                collection={collection} 
                withoutButtons 
            />
            <ItemForm
                collection={collection} 
                updateCollection={updateCollection}
                handleItemData={createItem}
                tags={tags}
                setTags={setTags}
                itemName={itemName}
                setItemName={setItemName}
                buttonText={l('Create item','Создать айтем')}
            />
        </div>
    )
}

export { CreateItem }