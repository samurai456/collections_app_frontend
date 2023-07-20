import { useContext, useEffect, useState } from 'react'
import { CollectionForm } from '../collectionForm/collectionForm'
import { backend } from '../../config'
import { useParams, Navigate } from 'react-router-dom'
import loadingGif from '../adminPanel/static/loading.gif'
import { PermissionContext } from '../../contexts/permissionContext'

function EditCollection(){
    const { collectionId } = useParams()
    const [ collection, setCollection] = useState('loading')
    const { permission } = useContext(PermissionContext)

    useEffect(()=>{
        fetch(`${backend}/api/collection/collection-for-editing/${collectionId}`)
            .then(a=>a.json())
            .then(res=>setCollection(res.collection))
    }, [])

    if(collection==='loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    if(permission!=='admin' && collection.author!==sessionStorage.userId){
        return <Navigate to="/" />
    }
    return <CollectionForm initial={collection} />
}

export { EditCollection }