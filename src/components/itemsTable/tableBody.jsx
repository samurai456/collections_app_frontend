import { useNavigate, Link } from 'react-router-dom'

function TableBody({items}){
    const navigate = useNavigate()

    const handleMouseEnter = e => e.target.closest('.table').classList.remove('table-hover')
    const handleMouseLeave = e => e.target.closest('.table').classList.add('table-hover')

    return(
        <tbody>
            {!items.length&& <div className="ps-2 pt-3">no items</div>}
            {items.map(i=>(
                <tr key={i._id} role="button" onClick={()=>navigate(`/item/${i._id}`)}>
                    <td>{i.name}</td>
                    <td>
                        <Link
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={e=>e.stopPropagation()} 
                            to={`/collection/${i.collection._id}`}
                        >
                            {i.collection.name}
                        </Link>
                    </td>
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
                </tr>
            ))}
        </tbody>
    )
}

export { TableBody }