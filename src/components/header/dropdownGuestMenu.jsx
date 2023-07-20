import { Dropdown,  DropdownButton } from 'react-bootstrap'
import settingsIcon from '../adminPanel/static/settings.png'
import { useContext } from 'react'
import { PermissionContext } from '../../contexts/permissionContext'
import { LangContext } from '../../contexts/langContext'

function DropdownGuestMenu() {
    const { l } = useContext(LangContext)
    const { theme, setTheme, lang, setLang } = useContext(PermissionContext)

    function handleSetTheme(theme){
        setTheme(theme)
        sessionStorage.theme = theme
    }
    function handleSetLang(lang){
        setLang(lang)
        sessionStorage.lang = lang
    }

    return (  
        <DropdownButton variant="light" title={<img src={settingsIcon} height={25} />}>  
            <div className="d-flex px-2 pt-1">
                <button 
                    className={"btn flex-grow-1 py-0 " + (lang==='ru'? 'btn-dark':'btn-light')}
                    onClick={()=>handleSetLang('ru')}
                >
                    {l('ru', 'рус')}
                </button>
                <button 
                    className={"btn flex-grow-1 py-0 " + (lang==='en'? 'btn-dark':'btn-light')}
                    onClick={()=>handleSetLang('en')}
                >
                    {l('en', 'анг')}
                </button>
            </div>
            <div className="d-flex px-2 py-1">
                <button 
                    className={"btn flex-grow-1 py-0 " + (theme==='dark'? 'btn-dark':'btn-light')}
                    onClick={()=>handleSetTheme('dark')}
                >
                    {l('dark', 'темн.')}
                </button>
                <button 
                    className={"btn flex-grow-1 py-0 " + (theme==='light'? 'btn-dark':'btn-light')}
                    onClick={()=>handleSetTheme('light')}
                >
                    {l('light', 'светл.')}
                </button>
            </div>
        </DropdownButton>
    )
}

export { DropdownGuestMenu };  