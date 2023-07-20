import { Dropdown,  DropdownButton} from 'react-bootstrap'
import userIcon from '../adminPanel/static/user.png'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { PermissionContext } from '../../contexts/permissionContext'
import { backend } from '../../config'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function DropdownUserMenu({admin}) {
  const { l} = useContext(LangContext)
  const { request } = useContext(RequestContext)
  const { theme, setTheme, lang, setLang, setPermission } = useContext(PermissionContext)
  const navigate = useNavigate()
  const [ email, setEmail ] = useState('')

  useEffect(()=>{
    request(
      `${backend}/api/user/email`, 
      'get', 
      r=>setEmail(r.email))
  }, [])

  function handleThemeChange(theme){
    request(
      `${backend}/api/user/theme/${theme}`, 
      'put'
    )
    setTheme(theme)
    sessionStorage.theme = theme
  }

  function handleLangChange(lang){
    request(
      `${backend}/api/user/lang/${lang}`, 
      'put',
    )
    setLang(lang)
    sessionStorage.lang = lang
  }

  function handleSignOut(){
    sessionStorage.userId = ''
    sessionStorage.jwt = ''
    setPermission('guest')
    navigate('/sign-in')
  }

  return (  
    <DropdownButton variant="light" title={<img src={userIcon} height={25} />}>
      <div className="text-secondary ps-4 text-truncate" style={{width: 170}}>{email|| 'loading...'}</div>
      <Dropdown.Item 
        onClick={()=>navigate(`/user-collections/${sessionStorage.userId}`)}
      >
        {l('Your collections', 'Твои коллекции')}
      </Dropdown.Item>
      {admin&& (
        <Dropdown.Item
          onClick={()=>navigate(`/admin-panel`)}
        >
          {l('Admin panel','Панель админа')}
        </Dropdown.Item>
      )}
      <div className="d-flex px-2 pt-1">
        <button 
          className={"btn flex-grow-1 py-0 " + (lang==='ru'? 'btn-dark':'btn-light')}
          onClick={()=>handleLangChange('ru')}
        >
          {l('ru', 'рус')}
        </button>
        <button 
          className={"btn flex-grow-1 py-0 " + (lang==='en'? 'btn-dark':'btn-light')}
          onClick={()=>handleLangChange('en')}
        >
          {l('en', 'анг')}
        </button>
      </div>
      <div className="d-flex px-2 py-1">
        <button 
          className={"btn flex-grow-1 py-0 " + (theme==='dark'? 'btn-dark':'btn-light')}
          onClick={()=>handleThemeChange('dark')}
        >
          {l('dark', 'темн.')}
        </button>
        <button 
          className={"btn flex-grow-1 py-0 " + (theme==='light'? 'btn-dark':'btn-light')}
          onClick={()=>handleThemeChange('light')}
        >
          {l('light', 'светл.')}
        </button>
      </div>
      <Dropdown.Item
        className="text-center text-danger"
        onClick={handleSignOut}
      >
        {l('Sign out', 'Выйти')}
      </Dropdown.Item>
    </DropdownButton>
  )
}

export { DropdownUserMenu };  