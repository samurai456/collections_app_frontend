import { useNavigate, Link } from 'react-router-dom'
import editIcon from '../../adminPanel/static/edit.png'

function ItemsTableBody({fields, items, setItems, showCRUBButtons}){
    const navigate = useNavigate()

    const handleMouseEnter = e => e.target.closest('.table').classList.remove('table-hover')
    const handleMouseLeave = e => e.target.closest('.table').classList.add('table-hover')

    return(
        <tbody>
            {!items.length&& <div className="ps-2 pt-3">no items</div>}
            {items.map(i=>(
                <tr key={i._id} role="button" onClick={()=>navigate(`/item/${i._id}`)}>
                    {showCRUBButtons && 
                        <td className="text-center">
                            <input
                                checked={i.checked}
                                onChange={e=>setItems(
                                    items.map(x=>(x._id ===i._id)?{...x, checked: e.target.checked}:{...x})
                                )}
                                onClick={e=>e.stopPropagation()}
                                type="checkbox"
                            />
                        </td>
                    }
                    <td>{i.name}</td>
                    {fields.map(x=>(
                        <td key={x.name}>
                            {x.type==='checkbox'?
                                (i.hasOwnProperty('__'+x.name)? (i['__'+x.name]?'yes':'no'): '')
                                :
                                i['__'+x.name]
                            }
                        </td>
                    ))}
                    {showCRUBButtons &&
                        <td className="text-end">
                            <Link
                                to={`/edit-item/${i._id}`}
                                onClick={e=>e.stopPropagation()}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="btn btn-light me-3"
                            >
                                <img style={{height: 25}} src={editIcon} />
                            </Link>
                        </td>
                    }
                </tr>
            ))}
        </tbody>
    )
}

export { ItemsTableBody }