import { DropdownUserMenu } from './dropdownUserMenu.jsx'
import { DropdownGuestMenu } from './dropdownGuestMenu.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { PermissionContext } from '../../contexts/permissionContext.jsx'
import { ThemeContext } from '../../contexts/themeContext.jsx'
import { LangContext } from '../../contexts/langContext.jsx'

function Header(){
    const { l} = useContext(LangContext)
    const { permission } = useContext(PermissionContext)
    const { ti } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [ searchFor, setSearchFor ] = useState('')

    return (
        <div className="row border-bottom justify-content-between p-3 px-4 m-0">
            <div className="col-auto h3 mb-0 order-1 d-flex align-items-center p-0">
                <Link to="/" className="text-decoration-none">{l('Main', 'Главная')}</Link>
            </div>
            <div className="p-0 col-12 order-sm-2 order-3 col-xl-7 col-lg-8 col-md-7 col-sm-6 row justify-content-center align-items-center my-1">
                <div className="col-xl-5 col-lg-6 col-md-9 col-sm-7 col-8 px-1">
                    <input
                        value={searchFor}
                        onChange={e=>setSearchFor(e.target.value)}
                        className={"form-control"+ti()} 
                        type="search"
                    />
                </div>
                <div className="col-auto row justify-content-end">
                    <Link 
                        to={`/search/${searchFor}`}
                        className="btn btn-primary col-auto px-4"
                    >
                        {l('Search', 'Поиск')}
                    </Link>
                </div>
            </div>
            <div className="col-auto text-center order-sm-3 order-2 my-1">
                { permission==='normal' && <DropdownUserMenu />}
                { permission==='guest' && (
                    <div className="row">
                        <button 
                            onClick={()=>navigate('/sign-in')}
                            className="btn btn-primary col-auto"
                        >
                            {l('Sign in', 'Войти')}
                        </button>
                        <div className="col-auto"><DropdownGuestMenu /></div>
                    </div>
                )}
                { permission==='admin' && <DropdownUserMenu admin={true} /> }
            </div>
        </div>
    )
}

export { Header }