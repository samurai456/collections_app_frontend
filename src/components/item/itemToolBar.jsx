import { Link, useParams } from 'react-router-dom'
import deleteIcon from '../adminPanel/static/delete.png'
import { useContext } from 'react'
import { LangContext } from '../../contexts/langContext'

function ItemToolBar({handleDelete}){
    const {l} = useContext(LangContext)
    const { itemId } = useParams()

    return(
        <div className="ps-5 row justify-content-start w-100">
            <Link
                to={`/edit-item/${itemId}`}
                className="btn btn-primary m-1 px-4 col-auto"
            >
                {l('Edit','Изменить')}
            </Link>
            <button 
                onClick={handleDelete}
                className="btn btn-danger px-4 m-1 col-auto"
            >
                <img src={deleteIcon} height={25} />
            </button>
        </div>
    )
}

export { ItemToolBar }