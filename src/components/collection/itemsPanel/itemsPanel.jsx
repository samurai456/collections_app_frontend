import loadingGif from '../../adminPanel/static/loading.gif'
import { ItemsToolBar } from './itemsToolBar'
import { PagesMenu } from './pagesMenu'
import { ItemsTable } from './itemsTable'
import { useState, useEffect, useContext } from 'react'
import { backend } from '../../../config'
import { useNavigate } from 'react-router-dom'
import { PermissionContext } from '../../../contexts/permissionContext'
import { useModalDelete } from '../../../customHooks/useModalDelete'
import { RequestContext } from '../../../contexts/requestContext'
import { LangContext } from '../../../contexts/langContext'
import { downloadCSV } from '../../../downloadCSV'
import { FilterModal } from './filterItems/filterModal'

function ItemsPanel({ collection, updateCollection, addFilter }){
    const authorId = collection.author._id
    const {l} = useContext(LangContext)
    const navigate = useNavigate()
    const setModal = useModalDelete()
    const [ items, setItems ] = useState('loading')
    const [ nameFilter, setNameFilter ] = useState({type: 'name', key: 'name', filt: ''})
    const [ totalPages, setTotalPages ] = useState(1)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ showModal, setShowModal ] = useState(false)
    const { request } = useContext(RequestContext)
    const { permission, updatePermission } = useContext(PermissionContext)

    useEffect(()=>requestForItems(), [currentPage])

    function requestForItems(withoutBody){
        setItems('loading')
        const cb = res =>{
            const i = res.items.map(i=>({...i, checked: false}))
            setItems(i)
            setTotalPages(res.pages)
            if(currentPage > res.pages) setCurrentPage(res.pages)
        }
        request(
            `${backend}/api/item/items-of-collection/${collection._id}/${currentPage}`, 
            'post', 
            cb, 
            withoutBody?[]:[...collection.itemFields, nameFilter]
        )
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

    function handleClearAllFilters(){
        setNameFilter({type: 'name', key: 'name', filt: ''})
        updateCollection(draft=>{
            draft.itemFields = draft.itemFields.map(i=>addFilter(i))
        })
        requestForItems(true)
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
        const cb = res =>{
            if(!res.items?.length) return 
            downloadCSV(collection.itemFields, res.items)
        }
        request(
            `${backend}/api/item/download-items-of-collection/${collection._id}`, 
            'post', 
            cb, 
            [...collection.itemFields, nameFilter]
        )
    }

    const showCRUBButtons = permission==='admin'||sessionStorage.userId===authorId
    return(
        <div className="mb-5">
            <div className="mb-4">
                <ItemsToolBar
                    emptyTable={items==='loading'||!items.length}
                    setShowModal={setShowModal}
                    handleExportToCSV={handleExportToCSV}
                    handleDelete={handleDelete}
                    showCRUBButtons={showCRUBButtons}
                />
            </div>  
            {totalPages>1 &&<PagesMenu 
                totalPages={totalPages} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
            />}
             {items!=='loading'? <>
                <ItemsTable 
                    fields={collection.itemFields} 
                    items={items} 
                    setItems={setItems} 
                    showCRUBButtons={showCRUBButtons}
                />
                <FilterModal 
                    nameFilter={nameFilter}
                    setNameFilter={setNameFilter}
                    handleClearAllFilters={handleClearAllFilters}
                    requestForItems={requestForItems}
                    showModal={showModal} 
                    setShowModal={setShowModal} 
                    fields={collection.itemFields}
                    updateCollection={updateCollection}
                />
            </> :
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
            }
            {totalPages>1 &&<PagesMenu 
                totalPages={totalPages} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
            />}  
        </div>
    )
}

export { ItemsPanel }