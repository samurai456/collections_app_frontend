import { PermissionContext } from '../../contexts/permissionContext'
import { useContext } from 'react'
import loadingGif from '../adminPanel/static/loading.gif'
import { Navigate, useLocation } from 'react-router-dom'

function CheckPermission({ children, permit }){
    const { permission } = useContext(PermissionContext);

    if(!permission){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    if(permission === 'admin' || permission === permit) return children
    return <Navigate to="/" />
}

export { CheckPermission }