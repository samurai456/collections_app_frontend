import loadingGif from './static/loading.gif'
import { ToolMenu } from './toolMenu'
import { Table } from './table'
import { useState, useEffect, useContext } from 'react'
import { backend } from '../../config'
import { ThemeContext } from '../../contexts/themeContext'
import { RequestContext } from '../../contexts/requestContext'
import { useNavigate } from 'react-router-dom'


function AdminPanel(){
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [order, setOrder] = useState(false);
    const [sortBy, setSortBy] = useState('_id');
    const {t} = useContext(ThemeContext)
    const { request } = useContext(RequestContext)

    const sortFunc = (a, b)=> a[sortBy]>b[sortBy]? (order?1:-1): (order?-1:1)

    const sortedUsers = [...users].sort(sortFunc);

    useEffect(()=>{
        const cb = res =>{
            if(!res.allUsers) navigate('/')
            const newUsers = res.allUsers.map(i=>({...i, checked: false}))
            setUsers(newUsers);
        }
        request( `${backend}/api/user/all/`, 'get', cb)
    }, []);

    return !users.length?
        (
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        ):
        (
            <div className={"d-flex flex-column flex-shrink-0 position-absolute end-0 start-0 top-0 bottom-0"+t()}>
                <div className="border-bottom pb-1">
                    <ToolMenu users={users} setUsers={setUsers} />
                </div>
                <div className="overflow-auto">
                    <div style={{minWidth: 1050}}>
                        <Table 
                            users={sortedUsers} 
                            setUsers={setUsers}
                            setOrder={setOrder}
                            sortBy={sortBy} 
                            setSortBy={setSortBy} 
                        /> 
                    </div>
                </div>
            </div>
        )
}

export { AdminPanel }