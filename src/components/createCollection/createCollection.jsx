import { useContext } from 'react'
import { CollectionForm } from '../collectionForm/collectionForm'
import { Navigate, useParams } from 'react-router-dom'
import { PermissionContext } from '../../contexts/permissionContext'

function CreateCollection(){
    const { authorId } = useParams()
    const { permission } = useContext(PermissionContext)

    if(permission!=='admin' && authorId!==sessionStorage.userId){
        return <Navigate to="/" />
    }
    return <CollectionForm />
}

export { CreateCollection }