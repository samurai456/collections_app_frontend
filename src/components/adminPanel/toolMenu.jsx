import deleteIcon from './static/delete.png'
import unblockIcon from './static/unblock.png'
import { backend } from '../../config'
import { useModalDelete } from '../../customHooks/useModalDelete'
import { useNavigate, Link } from 'react-router-dom'
import { useContext } from 'react'
import { RequestContext } from '../../contexts/requestContext'

function ToolMenu({users, setUsers}){
    const navigate = useNavigate()
    const { request } = useContext(RequestContext)
    const selectedIds = users.filter(i=>i.checked).map(i=>i._id)
    const setModal= useModalDelete()

    const cb = res =>{
        if(!res.allUsers) return navigate('/')
        const newUsers = res.allUsers.map(i=>(
            {...i, checked: selectedIds.includes(i._id) }
        ))
        setUsers(newUsers);
    }

    const iconToField = op => {
        const field = op.includes('block')? 'status': 'isAdmin'
        setUsers(users.map(i=>selectedIds.includes(i._id)?{...i, [field]: ''}:{...i}))
    }

    const putRequest = operation => {
        if(!selectedIds.length) return
        iconToField(operation);
        request(
            `${backend}/api/user/${operation}/`, 
            'put', 
            cb, 
            {ids: selectedIds}
        )
    }

    const handleDelete = () => {
        if(!selectedIds.length) return
        const onDeleteClick = () =>{
            request(
                `${backend}/api/user/delete`, 
                'delete', 
                cb, 
                {ids: selectedIds}
            )
        }
        setModal(`Do you want to delete ${selectedIds.length} user(s)?`, onDeleteClick);
    }

    return(
        <div className="d-flex align-items-center justify-content-between pt-1 text-nowrap" >
            <div className="ps-4 row justify-content-start">
                <button
                    className="btn btn-danger m-1 px-4 col-10 order-sm-1 order-3 col-md-3 col-lg-auto col-sm-4"
                    onClick={()=>putRequest('block')}
                >
                    Block
                </button>
                <button 
                    className="btn btn-info m-1 col-4 col-md-3 order-sm-2 order-1 col-lg-auto col-sm-3"
                    onClick={()=>putRequest('unblock')}
                >
                    <img src={unblockIcon} height={25}/>
                </button>
                <button 
                    className="btn btn-danger m-1 col-4 col-md-3 order-sm-3 order-2 col-lg-auto col-sm-3"
                    onClick={handleDelete}
                >
                    <img src={deleteIcon} height={25} />
                </button>
                <button 
                    className="btn btn-primary px-4 m-1 col-10 col-md-5 col-sm-10 col-lg-auto order-4"
                    onClick={()=>putRequest('give-admin')}
                >
                    Add to admins
                </button>
                <button 
                    className="btn btn-primary m-1 px-4 col-10 col-md-5 col-sm-10 col-lg-auto order-5"
                    onClick={()=>putRequest('take-admin')}
                >
                    Delete from admins
                </button>
            </div>
            <div className="align-self-start pe-4">
                <div className="row">
                    <Link
                        to="/"
                        className="btn btn-primary m-2 px-4 p-3 col-md-5 col-sm-10 col-11 col-lg-auto"
                    >
                        Main
                    </Link>
                    <button
                        onClick={()=>navigate(-1)}
                        className="btn btn-primary m-2 p-3 col-md-5 col-sm-10 col-11 col-lg-auto"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    )
}

export { ToolMenu }