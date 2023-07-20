import { createContext, useContext } from 'react'
import { PermissionContext } from './permissionContext'

const ThemeContext = createContext()

function ThemeProvider({children}){
    const {theme} = useContext(PermissionContext)

    function t(){
        if(theme === 'dark'){
            return ' bg-dark bg-gradient text-white table-dark '
        }
        return ''
    }

    function ti(){
        if(theme === 'dark'){
            return ' bg-dark text-white '
        }
        return ''
    }

    function srh(){
        if(theme === 'dark'){
            return ' hover-itemrow-dark '
        }
        return ' hover-itemrow-light '
    }

    function sr(){
        if(theme === 'dark'){
            return ' itemrow-dark '
        }
        return ' itemrow-light '
    }

    return(
        <ThemeContext.Provider value={{t, ti, sr, srh}}>
            {children}    
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }