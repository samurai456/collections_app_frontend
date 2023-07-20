import { CollectionsTable } from '../collectionsTable/collectionsTable'
import { backend } from '../../config'
import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import loadingGif from '../adminPanel/static/loading.gif'
import { PermissionContext } from '../../contexts/permissionContext'
import { useModalDelete } from '../../customHooks/useModalDelete'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function UserCollections(){
    const { l } = useContext(LangContext)
    const { authorId } = useParams()
    const { request } = useContext(RequestContext)
    const { permission, updatePermission } = useContext(PermissionContext)
    const [ collections, setCollections ] = useState('loading')
    const [ user, setUser ] = useState()
    const setModal = useModalDelete()

    function requestCollections(){
        const cb = res=>{
            setCollections(res.collections)
            setUser(res.user)
        }
        fetch(`${backend}/api/collection/collections-of-user/${authorId}`)
            .then(a=>a.json())
            .then(cb)
    }

    useEffect(()=>{
        setCollections('loading')
        requestCollections()
    }, [authorId])

    function handleDelete(collection){
        const cb = res =>{
            updatePermission(res.permission)
            requestCollections()
        }
        const onDeleteClick = ()=>{
            setCollections('loading')
            request(
                `${backend}/api/collection/${collection._id}`, 
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

    if(collections === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    return(
        <div>
            <div className="pt-5 px-5">
                {sessionStorage.userId===authorId? (
                    <div className="h3 pb-2">{l('Your collections','Ваши коллекции')}</div>
                ):(
                    <div className="row align-items-center">
                        <div className="h3 pe-4 col-auto">{l('Collections of','Коллекции')} </div> 
                        <div className="border rounded d-flex flex-column p-2 h6 col-auto">
                            <div>{user.nickname}</div>
                            <div>{user.email}</div>
                        </div>
                    </div>
                )}
                {(sessionStorage.userId===authorId||permission==='admin') && (
                    <Link
                        to={`/create-collection/${authorId}`}
                        className="btn btn-primary py-2"
                    >
                        + {l('New collection', 'Новая коллекция')}
                    </Link>
                )}
            </div>
            <div className="py-5">
                <CollectionsTable 
                    collections={collections} 
                    authorId={authorId} 
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    )
}

export { UserCollections }