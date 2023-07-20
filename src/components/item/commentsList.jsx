import { Comment } from './comment'
import loadingGif from '../adminPanel/static/loading.gif'

function CommentsList({ comments, itemCRUDPermitted }){
    if(comments === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    return(
        comments.map(i=>
            <Comment key={i._id} comment={i} itemCRUDPermitted={itemCRUDPermitted}/>
        )
    )
}

export { CommentsList }