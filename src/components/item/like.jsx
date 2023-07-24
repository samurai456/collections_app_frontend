import likeIcon from '../adminPanel/static/like.png'
import { backend } from '../../config'
import loadingGif from '../adminPanel/static/loading.gif'
import { useContext } from 'react'
import { PermissionContext } from '../../contexts/permissionContext'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function Like({likes, liked, itemId, setLiked, setLikes}){
    const {l} = useContext(LangContext)
    const {permission} = useContext(PermissionContext)
    const { request } = useContext(RequestContext)
    
    function handleClick(){
        setLiked(!liked)
        const method = liked? 'delete': 'post'
        request(`${backend}/api/like/${itemId}`, method )
    }

    if(likes === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    let ruLikes='лайков'
    let enLikes='likes'
    if(likes%10===1) ruLikes='лайк'
    if(1<likes%10 && likes%10<5) ruLikes='лайка'
    if(likes===1) enLikes='like'
    return(
        <div className="row ps-5 py-3 align-items-center w-100 m-0">
            {permission!=='guest' && (
                <button 
                    className={"col-auto btn rounded-circle p-0 "+(liked? 'btn-danger': 'btn-light')} 
                    style={{height: 50, width: 50}}
                    onClick={handleClick}
                >
                    <img src={likeIcon} style={{height: 30, width: 30}}/>
                </button>
            )}
            <div className="col-auto fs-5">{ likes }</div>
            {permission==='guest' && <div className="col-auto fs-5">
                {l(enLikes, ruLikes)}
            </div>}
        </div>
    )
}

export { Like }