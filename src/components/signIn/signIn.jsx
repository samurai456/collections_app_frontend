import { backend } from '../../config'
import { useState, useContext } from 'react'
import { ToastContext } from '../../contexts/toastContext'
import { PermissionContext } from '../../contexts/permissionContext'
import { ThemeContext } from '../../contexts/themeContext'
import { useNavigate, Link } from 'react-router-dom'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function SignIn(){
    const { l } = useContext(LangContext)
    const navigate = useNavigate()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { request } = useContext(RequestContext)
    const { setToastText, setShowToast } = useContext(ToastContext)
    const { setPermission, setTheme, setLang } = useContext(PermissionContext)
    const {t, ti} = useContext(ThemeContext)

    function handleClick(){
        if(!email || !password){
            setShowToast(true)
            setToastText(l('fill empty fields','заполните пустые поля'))
            return
        }
        const cb = res =>{
            if(res.type !== 'signin-success'){
                setShowToast(true)
                setToastText(res.msg)
                return
            }
            sessionStorage.jwt = res.token
            sessionStorage.userId = res.userId
            sessionStorage.theme = res.theme
            sessionStorage.lang = res.lang 
            setPermission(res.permission)
            setLang(res.lang)
            setTheme(res.theme)
            navigate('/')
        }
        request(`${backend}/api/user/sign-in`, 'post', cb, {email, password})
    }

    const adaptive = " col-9 col-xl-3 col-lg-4 col-sm-7 col-md-5 "
    return(
        <div className={"d-flex flex-column justify-content-start align-items-center pt-5 position-absolute top-0 start-0 end-0 bottom-0"+t()}>
            <div className="px-5 pb-4 align-self-start">
                <Link 
                    to="/" 
                    className="btn btn-primary px-4 py-2 fs-5"
                >
                    {l('Go to Main','На главную')}
                </Link>
            </div>
            <div className="fs-5">
                {l('Sign in','Вход')}
            </div>
            <div className={adaptive}>
                <label>{l('Email','Почта')}</label>
                <input
                    value={email} 
                    onChange={e=>setEmail(e.target.value)}
                    className={"form-control"+ti()}
                />
            </div>
            <div className={adaptive}>
                <label>{l('Password','Пароль')}</label>
                <input
                    type="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)} 
                    className={"form-control"+ti()}
                />
            </div>
            <div className={adaptive+'text-end mt-3'}>
                <button
                    className="btn btn-primary px-3"
                    onClick={handleClick}
                >
                    {l('Sign in','Войти')}
                </button>
            </div>
            <div className={adaptive+'text-end mt-3'}>
                <div>
                    <span>
                        {l('Do not have an account? ', 'У вас нет аккаунта? ')} 
                    </span>
                    <Link to="/sign-up">
                        {l('Sign up','Зарегистрируйтесь')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export {SignIn}