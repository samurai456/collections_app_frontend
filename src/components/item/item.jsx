import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { backend, backendWS } from '../../config'
import loadingGif from '../adminPanel/static/loading.gif'
import { ItemToolBar } from './itemToolBar'
import { ItemDetails } from './itemDetails'
import { Like } from './like'
import { CommentsList } from './commentsList'
import { CommentForm } from './commentForm'
import { CustomWS } from '../../customWS/customWS'
import { PermissionContext } from '../../contexts/permissionContext'
import { useModalDelete } from '../../customHooks/useModalDelete'
import { RequestContext } from '../../contexts/requestContext'
import { flushSync } from 'react-dom'
import { LangContext } from '../../contexts/langContext'

function Item(){
    const { l } = useContext(LangContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const commentId = useRef(searchParams.get('c'))
    const setModal = useModalDelete()
    const navigate = useNavigate()
    const { permission, updatePermission } = useContext(PermissionContext)
    const { request } = useContext(RequestContext)
    const { itemId } = useParams()
    const [ item, setItem ] = useState('loading')
    const [ comments, setComments ] = useState('loading')
    const [ likes, setLikes ] = useState('loading')
    const [ liked, setLiked ] = useState(false)

    function requestItem(){
        const cb = res =>{
            if(!res.item) return navigate("/")
            setItem(res.item)
        }
        fetch(`${backend}/api/item/${itemId}`)
            .then(a=>a.json())
            .then(cb)
    }

    useEffect(()=>requestItem(), [])

    useEffect(()=>{
        const url = `${backendWS}/${itemId}/${sessionStorage.userId||''}`
        const ws = new CustomWS(url)
        const cbLikes = res =>{
            flushSync(()=>{
                if(res.hasOwnProperty('likes')) setLikes(res.likes)
                if(res.hasOwnProperty('liked')) setLiked(res.liked)
            })
        }
        ws.addCustomCb({key: 'track-likes', cb: cbLikes })
        ws.addCustomCb({key: 'add-comments', cb: getComments})
        return ()=>ws.close()
    }, [])
    
    function getComments(res){
        if(!res.comments) return
        flushSync(()=>{
            setComments(res.comments)
        })
        const foundComment = document.getElementById(commentId.current)
        if(commentId.current && foundComment){
            document.querySelector('.frameBody')
                .scrollTo({ top: foundComment.offsetTop, behavior: 'smooth' })
            setSearchParams()
            commentId.current = ''
        }   
    }
    
    function onDeleteClick(){
        const ids = [itemId]
        setItem('loading')
        const cb = res =>{
            updatePermission(res.permission)
            if(res.type==='success') return navigate('/')
            requestItem()
        }
        request(
            `${backend}/api/item/delete-many`, 
            'delete', 
            cb, 
            {ids},
        )
    }
    function handleItemDelete(){
        setModal(
            l('Do you want to delete this item?','Вы хотите удалить этот айтем?'),
            onDeleteClick
        )
    }


    if(item === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    const itemCRUDPermitted = sessionStorage.userId===item.author._id || permission==='admin'
    return(
        <div className="mt-4 pb-5">
            {itemCRUDPermitted && <ItemToolBar handleDelete={handleItemDelete} />}
            <ItemDetails item={item}/>
            <Like 
                likes={likes} 
                liked={liked} 
                setLiked={setLiked} 
                setLikes={setLikes} 
                itemId={itemId}
            />
            <CommentsList 
                itemCRUDPermitted={itemCRUDPermitted}
                comments={comments}
            />
            {permission!=='guest'&& <CommentForm />}
        </div>
    )
}

export { Item }