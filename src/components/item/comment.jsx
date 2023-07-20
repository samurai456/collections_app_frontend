import deleteIcon from '../adminPanel/static/delete.png'
import { Link } from 'react-router-dom'
import { backend } from '../../config'
import { useContext } from 'react'
import { PermissionContext } from '../../contexts/permissionContext'
import { RequestContext } from '../../contexts/requestContext'

function Comment({ comment, itemCRUDPermitted }){
    const { request } = useContext(RequestContext)
    const created_at = `${comment.created_at.slice(0,10)} ${comment.created_at.slice(11,16)}`
    const {updatePermission} = useContext(PermissionContext)

    function handleDelete(){
        const cb = res =>{
            updatePermission(res.permission)
        }
        request(
            `${backend}/api/comment/${comment._id}`, 
            'delete', 
            cb
        )
    }

    return(
        <div className="ps-5 row pt-3 w-100" id={comment._id}>
            <Link 
                to={`/user-collections/${comment.user._id}`}
                className="btn btn-dark border rounded-pill col-auto py-2 px-3"
            >
                <div className="h5 m-0 text-start">{comment.user.nickname}</div>
                <div className="ms-2">{comment.user.email}</div>
            </Link>
            <div className="px-5 d-flex">
                <div className="border p-3 rounded flex-grow-1 position-relative">
                    <div className="pt-2 ps-2">{comment.text}</div>
                    <div style={{fontSize: 12}} className="position-absolute top-0 start-0 text-secondary pt-1 ps-2">
                        {created_at}
                    </div>
                </div>
                {(sessionStorage.userId===comment.user._id|| itemCRUDPermitted) &&
                    <div className="justify-self-end pt-2 ps-2">
                        <button 
                            onClick={handleDelete}
                            className="btn btn-light"
                        >
                            <img style={{height: 25}} src={deleteIcon} />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export { Comment }