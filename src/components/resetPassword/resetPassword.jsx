import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LangContext } from "../../contexts/langContext";
import { ThemeContext } from "../../contexts/themeContext";
import loadingGif from '../adminPanel/static/loading.gif'
import { ToastContext } from "../../contexts/toastContext";
import { RequestContext } from "../../contexts/requestContext";
import { backend } from "../../config";

function ResetPassword(){
    const navigate = useNavigate()
    const {l} = useContext(LangContext)
    const {t, ti} = useContext(ThemeContext)
    const { request } = useContext(RequestContext)
    const { setToastText, setShowToast } = useContext(ToastContext)
    const { token, userId } = useParams()
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    function handleClick(){
        if(!password){
            setShowToast(true)
            setToastText(l('enter new password', 'введите новый пароль'))
            return
        }
        setLoading(true)
        const cb = r =>{
            setLoading(false)
            if(r.msg){
                setShowToast(true)
                setToastText(r.msg)
            }
            navigate('/sign-in')
        }
        request(`${backend}/api/user/reset-password`, 'post', cb, {token, userId, password})
    }
    if(loading){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    const adaptive = " col-9 col-xl-3 col-lg-4 col-sm-7 col-md-5 "
    return(
        <div className={"d-flex flex-column justify-content-start align-items-center pt-5 position-absolute top-0 start-0 end-0 bottom-0"+t()}>
            <div className="fs-5">
                {l('Enter new password','Введите новый пароль')}
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
                    {l('Confirm','Подтвердить')}
                </button>
            </div>
        </div>
    )
}

export { ResetPassword }