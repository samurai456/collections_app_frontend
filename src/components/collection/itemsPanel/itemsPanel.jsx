import loadingGif from '../../adminPanel/static/loading.gif'
import { ItemsToolBar } from './itemsToolBar'
import { ItemsTable } from './itemsTable'
import { useState, useEffect, useContext } from 'react'
import { backend } from '../../../config'
import { useNavigate } from 'react-router-dom'
import { PermissionContext } from '../../../contexts/permissionContext'
import { useModalDelete } from '../../../customHooks/useModalDelete'
import { RequestContext } from '../../../contexts/requestContext'
import { LangContext } from '../../../contexts/langContext'
import { downloadCSV } from '../../../downloadCSV'

function ItemsPanel({ fields, collectionId, authorId }){
    const {l} = useContext(LangContext)
    const navigate = useNavigate()
    const setModal = useModalDelete()
    const [ items, setItems ] = useState('loading')
    const { request } = useContext(RequestContext)
    const { permission, updatePermission } = useContext(PermissionContext)

    useEffect(()=>requestForItems(), [])

    function requestForItems(){
        const cb = res =>{
            const i = res.items.map(i=>({...i, checked: false}))
            setItems(i)
        }
        fetch(`${backend}/api/item/items-of-collection/${collectionId}`)
            .then(a=>a.json())
            .then(cb)
    }

    function onDeleteClick(){
        const ids = items.filter(i=>i.checked).map(i=>i._id)
        setItems('loading')
        const cb = res =>{
            updatePermission(res.permission)
            if(res.type==='success'){
                return requestForItems()
            }
        }
        request(
            `${backend}/api/item/delete-many`, 
            'delete', 
            cb, 
            {ids},
        )
    }

    function handleDelete(){
        const c = items.filter(i=>i.checked).length
        if(!c) return
        setModal(
            l(`Do you want to delete ${c} item(s)?`,`Вы хотите удалить ${c} айтема(мов)?`),
            onDeleteClick
        )
    }

    function handleExportToCSV(){
        if(!items.length) return
        downloadCSV(fields, items)
    }

    if(items === 'loading'){
        return (
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    const showCRUBButtons = permission==='admin'||sessionStorage.userId===authorId
    if(!items.length){
        return (
            <div className="row align-items-center ps-5">
                <div className="fs-4 py-3 col-auto">Collection is empty, yet</div>
                {showCRUBButtons &&
                    <button
                        className="btn btn-primary m-1 px-4 py-3 col-auto"
                        onClick={()=>navigate(`/create-item/${collectionId}`)}
                    >
                        New item
                    </button>
                }
            </div>
        )
    }
    return(
        <div>
            <div className="mb-4">
                <ItemsToolBar
                    handleExportToCSV={handleExportToCSV}
                    handleDelete={handleDelete}
                    showCRUBButtons={showCRUBButtons}
                />
            </div>
            <ItemsTable 
                fields={fields} 
                items={items} 
                setItems={setItems} 
                showCRUBButtons={showCRUBButtons}
            />
        </div>
    )
}

export { ItemsPanel }