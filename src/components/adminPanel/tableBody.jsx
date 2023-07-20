import loadingGif from './static/loading.gif'

function TableBody({users, setUsers}){

    function handleChange(e, id){
        const checked = e.target.checked;
        const newUsers = users.map(i=>(i._id===id)? {...i, checked}: {...i});
        setUsers(newUsers);
    }

    return(
        <tbody>
            {users.map(i=>(
                <tr key={i._id}>
                    <td className="text-center"> 
                        <input
                            type="checkbox"
                            checked={i.checked} 
                            onChange={e=>handleChange(e, i._id)}
                        />
                    </td>
                    <td>{i._id}</td>
                    <td>{i.nickname}</td>
                    <td>{i.email}</td>
                    <td>{i.registrationDate.slice(0, 10)}</td>
                    <td>{i.lastLoginDate.slice(0, 10)}</td>
                    <td 
                        className={
                            (i.status ? 'text-success':'text-danger') + 
                            (typeof i.status==='boolean'? '': ' pt-0 position-relative')
                        }
                    >
                        {
                            typeof i.status==='boolean'?
                                (i.status? 'active': 'blocked'):
                                <div className="position-absolute m-0 h-100">
                                    <img src={loadingGif} className="h-100 mw-100 m-0 object-fit-contain"/>
                                </div>
                        }
                    </td>
                    <td 
                        className={(
                            typeof i.isAdmin==='boolean'?
                                '': ' pt-0 position-relative'
                        )}
                    >
                        {
                            typeof i.isAdmin==='boolean'?
                                (i.isAdmin? 'Yes': 'No'):
                                <div className="position-absolute m-0 h-100">
                                    <img src={loadingGif} className="h-100 mw-100 m-0 object-fit-contain"/>
                                </div>
                        }
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export { TableBody }