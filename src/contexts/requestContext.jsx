import { createContext, useContext } from 'react'
import { PermissionContext } from './permissionContext'

const RequestContext = createContext()

function RequestProvider({children}){
    const {updatePermission} = useContext(PermissionContext)

    function request(url, method, cb, body){
        const fd = body?.toString()?.includes('FormData')

        fetch(url, {
            method,
            headers: {
                jwt: sessionStorage.jwt,
                userid: sessionStorage.userId,
                ...(fd?{}:{'Content-Type': 'application/json'}),
            },
            body: (method==='get')? undefined: fd? body: JSON.stringify(body)
        })
        .then(r=>r.json())
        .then(r=>{
            updatePermission(r.permission)
            if(cb) cb(r)
        })
    }

    return(
        <RequestContext.Provider value={{ request }}>
            {children}    
        </RequestContext.Provider>
    )
}

export { RequestProvider, RequestContext }