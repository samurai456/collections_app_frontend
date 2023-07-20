import defaultIcon from '../../adminPanel/static/defaultIcon.png'
import editIcon from '../../adminPanel/static/edit.png'
import deleteIcon from '../../adminPanel/static/delete.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { PermissionContext } from '../../../contexts/permissionContext'
import { LangContext } from '../../../contexts/langContext'

function CollectionDetails({collection, handleDelete, withoutButtons}){
    const { l } = useContext(LangContext)
    const { permission } = useContext(PermissionContext)
    
    return(
        <div className="row border">
            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 row justify-content-center">
                <img src={collection.img|| defaultIcon} style={{height: 320, width: 320}} className="p-2"/>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 d-flex flex-column fs-4 p-4">
                <div>{l('Collection name','Название коллекции')}: <b>{collection.name}</b></div>
                <div>
                    <span>{l('Author','Автор')}: </span> 
                    <Link to={`/user-collections/${collection.author._id}`}>
                        <b>{collection.author.nickname}</b>
                    </Link>
                </div>
                <div>{l('Description','Описание')}: <span dangerouslySetInnerHTML={{__html: collection.description}} /></div>
                <div>{l('Topic','Тематика')}: <b>{collection.name? collection.topic||'other': ''}</b></div>
                {(sessionStorage.userId === collection.author._id || permission === 'admin') && !withoutButtons &&
                    <div className="pt-3">
                        <Link to={`/edit-collection/${collection._id}`} className="btn btn-light me-3">
                            <img style={{height: 25}} src={editIcon} />
                        </Link>
                        <button onClick={handleDelete} className="btn btn-danger">
                            <img style={{height: 25}} src={deleteIcon} />
                        </button>
                    </div>
                }
                
            </div>
        </div>
    )
}

export { CollectionDetails }