import deleteIcon from '../adminPanel/static/delete.png'
import editIcon from '../adminPanel/static/edit.png'
import { useNavigate, Link } from 'react-router-dom'
import { useContext } from 'react'
import { PermissionContext } from '../../contexts/permissionContext'

function TableBody({collections, authorId, handleDelete}){
    const {permission} = useContext(PermissionContext)
    const navigate = useNavigate()
    const handleMouseEnter = e => e.target.closest('.table').classList.remove('table-hover')
    const handleMouseLeave = e => e.target.closest('.table').classList.add('table-hover')

    return(
        <tbody>
            {!collections.length&& <div className="ps-2 pt-3">no collections</div>}
            {collections.map(i=>(
                <tr key={i._id} role="button" onClick={()=>navigate(`/collection/${i._id}`)}>
                    <td>{i.name}</td>
                    <td>{i.topic?.name||'other'}</td>
                    { !authorId&& (
                        <td>
                            <Link
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={e=>e.stopPropagation()} 
                                to={`/user-collections/${i.author._id}`}
                            >
                                {i.author.nickname}
                            </Link>
                        </td> 
                    )}
                    <td>{i.items}</td>
                    { authorId && (authorId===sessionStorage.userId||permission==='admin') && (
                        <td className="text-end">
                            <Link
                                to={`/edit-collection/${i._id}`}
                                onClick={e=>e.stopPropagation()}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="btn btn-light me-3"
                            >
                                <img style={{height: 25}} src={editIcon} />
                            </Link>
                            <button
                                onClick={e=>{
                                    e.stopPropagation()
                                    handleDelete(i)
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="btn btn-light"
                            >
                                <img style={{height: 25}} src={deleteIcon} />
                            </button>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    )
}

export { TableBody }