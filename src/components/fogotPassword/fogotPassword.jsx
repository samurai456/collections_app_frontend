import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../../contexts/themeContext"
import { LangContext } from "../../contexts/langContext"
import { ToastContext } from "../../contexts/toastContext"
import { backend } from "../../config"
import loadingGif from '../adminPanel/static/loading.gif'

function ForgotPassword(){
    const navigate = useNavigate()
    const {t, ti} = useContext(ThemeContext)
    const {l} = useContext(LangContext)
    const {setToastText, setShowToast} = useContext(ToastContext)
    const [ email, setEmail ] = useState('')
    const [ showInstructions, setShowInstructions] = useState(false)
    const [ loading, setLoading ] = useState(false)

    function handleServerResponse(r){
        setLoading(false)
        if(r.msg){
            setShowToast(true)
            setToastText(r.msg)
        }
        if(r.type==='success') setShowInstructions(true)
    }

    function handleClick(){
        if(!email){
            setShowToast(true)
            setToastText(l('enter your email', 'введите адрес электронной почты'))
            return
        }
        setLoading(true)
        fetch(`${backend}/api/user/reset-password/${email}`)
            .then(a=>a.json())
            .then(handleServerResponse)
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
            <div className="px-5 pb-4 align-self-end">
                <button
                    onClick={()=>navigate(-1)}
                    className="btn btn-primary px-4 py-2 fs-5"
                >
                    {l('Go back','Назад')}
                </button>
            </div>
            {showInstructions?
                <div className="fs-5">
                    {l(`A mail with password ressetting link was sent to your email (${email})`,
                    `Письмо содержащее ссылку на сброс пароля был отправлен в вашу почту (${email})`)}
                </div>
                :
                <>
                    <div className="fs-5">
                        {l('Enter your email','Введите адрес электронной почта')}
                    </div>
                    <div className={adaptive}>
                        <label>{l('Email','Почта')}</label>
                        <input
                            value={email} 
                            onChange={e=>setEmail(e.target.value)}
                            className={"form-control"+ti()}
                        />
                    </div>
                    <div className={adaptive+'text-end mt-3'}>
                        <button
                            className="btn btn-primary px-3"
                            onClick={handleClick}
                        >
                            {l('Submit','Отправить')}
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export {ForgotPassword}