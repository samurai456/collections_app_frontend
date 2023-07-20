import { createContext, useContext } from 'react'
import { PermissionContext } from './permissionContext'

const LangContext = createContext()

function LangProvider({children}){
    const {lang} = useContext(PermissionContext)

    function l(en, ru){
        return lang==='ru'? ru: en; 
    }

    return(
        <LangContext.Provider value={{l}}>
            {children}    
        </LangContext.Provider>
    )
}

export { LangProvider, LangContext }