import { backend } from '../../config'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContext } from '../../contexts/toastContext'
import { ThemeContext } from '../../contexts/themeContext'
import { PermissionContext } from '../../contexts/permissionContext'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function SignUp(){
    const { l } = useContext(LangContext)
    const navigate = useNavigate()
    const { request} = useContext(RequestContext)
    const { setShowToast, setToastText } = useContext(ToastContext)
    const { setPermission } = useContext(PermissionContext)
    const {t, ti} = useContext(ThemeContext)
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function showToastText(text){
        setShowToast(true)
        setToastText(text)
    }

    function handleClick(){
        if(!nickname || !email || !password){
            return showToastText(
                l('fill empty fields','заполните пустые поля')
            )   
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return showToastText(
                l('invalid email format', 'неправильный адрес почты')
            )
        }

        const cb = res =>{
            if(res.type !== 'signup-success'){
                return showToastText(res.msg)
            }
            sessionStorage.jwt = res.token
            sessionStorage.userId = res.userId
            setPermission('normal')
            navigate('/')
        }
        
        request(
            `${backend}/api/user/sign-up`, 
            'post', 
            cb, 
            {
                nickname, 
                email, 
                password, 
                theme: sessionStorage.theme, 
                lang: sessionStorage.lang
            },
        );
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
                {l('Sign up','Регистрация')}
            </div>
            <div className={adaptive}>
                <label>{l('Nickname','Никнейм')}</label>
                <input
                    value={nickname}
                    onChange={e=>setNickname(e.target.value)} 
                    className={"form-control"+ti()}
                />
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
                    {l('Sign up','Зарегистрироваться')}
                </button>
            </div>
            <div className={adaptive+'text-end mt-3'}>
                <div>
                    <span>
                        {l('Already has an account? ','У вас уже есть аккаунт? ')}
                    </span>
                    <Link to="/sign-in">
                        {l('Sign in','Войти')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export {SignUp}