import { createContext, useState, useEffect } from 'react'
import { backend } from '../config'
import loadingGif from '../components/adminPanel/static/loading.gif'

const PermissionContext = createContext('');

function PermissionProvider({ children }){
    const [ permission, setPermission ] = useState('')
    const [ theme, setTheme ] = useState(sessionStorage.theme||'light')
    const [ lang, setLang ] = useState(sessionStorage.lang||'en')

    useEffect(()=>{
      if(!sessionStorage.jwt){
        setPermission('guest')
        return
      }
      const cb = res=>{
        if(res.type!=='verification') return
        setPermission(res.permission)
        if(permission==='guest'){
          sessionStorage.jwt = ''
          sessionStorage.userId = ''
          return
        }
        setLang(res.lang)
        setTheme(res.theme)
        sessionStorage.theme = res.theme
        sessionStorage.lang = res.lang
      }
      fetch(`${backend}/api/verify`, {
        headers: {
          jwt: sessionStorage.jwt,
          userid: sessionStorage.userId,
        }
      }).then(a=>a.json())
      .then(cb)
    }, []);

    function updatePermission(perm){
      if(!perm) return
      if(perm==='guest'){
        sessionStorage.jwt = ''
        sessionStorage.userId = ''
      }
      setPermission(perm)
    }
    
    if(!permission){
      return(
        <div className="row justify-content-center mt-5">
          <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
        </div>
      )
    }
    return(
        <PermissionContext.Provider 
          value={{ 
            permission, 
            setPermission,
            updatePermission,
            theme, 
            setTheme, 
            lang, 
            setLang 
          }}
        >
            {children}
        </PermissionContext.Provider>
    )
}

export { PermissionContext }
export { PermissionProvider }