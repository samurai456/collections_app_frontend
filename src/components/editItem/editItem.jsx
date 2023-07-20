import { CollectionDetails } from '../collection/collectionDetails/collectionDetails'
import { ItemForm } from '../itemForm/itemForm'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import { ToastContext } from '../../contexts/toastContext'
import { backend } from '../../config'
import loadingGif from '../adminPanel/static/loading.gif'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function EditItem(){
    const { l } = useContext(LangContext)
    const navigate = useNavigate()
    const { setShowToast, setToastText} = useContext(ToastContext)
    const { request } = useContext(RequestContext)
    const { itemId } = useParams()
    const [ tags, setTags ] = useState()
    const [ itemName, setItemName ] = useState('')
    const [ collection, updateCollection ] = useImmer()
    const [ loading, setLoading ] = useState(true)

    useEffect(()=> requestForItem(), [])

    function requestForItem(){
        const cb = res =>{
            if(!res.item){
                setShowToast(true)
                setToastText('item does not exist')
                return navigate(-1)
            }
            res.item.collection.itemFields = setValuesToFields(res.item)
            setItemName(itemName||res.item.name)
            setTags(tags||res.item.tags||[])
            updateCollection(res.item.collection)
            setLoading(false)
        }
        fetch(`${backend}/api/item/for-editing/${itemId}`)
            .then(a=>a.json())
            .then(cb)
    }

    function setValuesToFields(item){
        return item.collection.itemFields.map(i=>{
            const field = collection?.itemFields?.find(
                x=>i.name+i.type+i.options.join('/')===x.name+x.type+x.options.join('/')
            )
            if(field) return field
            if(item.hasOwnProperty('__'+i.name)) return { ...i, val: item['__'+i.name] }
            if(i.type==='options') return { ...i, val: i.options[0] }
            if(i.type==='checkbox') return { ...i, val: false }
            return { ...i, val: '' }
        })
    }

    function updateItem(item){
        setLoading(true)
        const cb = res => {
            if(res.type === 'additional-fields-404') {
                setShowToast(true)
                setToastText(res.msg)
                requestForItem()
            }
            if(res.type === 'success') navigate(`/item/${itemId}`)
        }
        request(
            `${backend}/api/item/${itemId}`, 
            'put', 
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
                handleItemData={updateItem}
                tags={tags}
                setTags={setTags}
                itemName={itemName}
                setItemName={setItemName}
                buttonText={l('Save','Сохранить')}
            />
        </div>
    )
}

export { EditItem }