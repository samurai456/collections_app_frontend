import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import './hover-itemrow.css'
import { useContext } from "react"
import { LangContext } from "../../contexts/langContext"
import { ThemeContext } from "../../contexts/themeContext"

function ItemRow({i}){
    const {sr, srh} = useContext(ThemeContext)
    const {l} = useContext(LangContext)
    const navigate = useNavigate()

    const handleMouseEnter = e => e.target.closest('.itemrow').classList.remove(srh().trim())
    const handleMouseLeave = e => e.target.closest('.itemrow').classList.add(srh().trim())

    const collection = i.collection|| i
    const item = i.item|| i
    const author = i.author;
    const commentText = i.text

    return(
        <div 
            role="button"
            onClick={()=>navigate(`/item/${item._id}${commentText? '?c='+i._id:''}`)}
            className={"fs-5 p-3 border-bottom border-secondary itemrow"+sr()+srh()}
        >
            <div className="row justify-content-between w-100">
                <div className="col-4">item title: <b>{item.name}</b></div>
                <div className="col-4">
                    <span>{l('collection','коллекция')}: </span>
                    <Link
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={e=>e.stopPropagation()} 
                        to={`/collection/${collection._id}`}
                    >
                        {collection.name}
                    </Link>
                </div>
                <div className="col-4">
                    <span>{l('author','автор')}: </span>
                    <Link
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={e=>e.stopPropagation()}  
                        to={`/user-collections/${author._id}`}
                    >
                        {author.nickname}
                    </Link>
                </div>
            </div>
            {commentText&& 
                <div className="row w-100 ps-4 p-2">
                    <div>{l('in comments','в комментариях')}: {commentText}</div>
                </div>
            }
        </div>
    )
}

export { ItemRow }