import { useContext } from 'react'
import deleteIcon from '../../adminPanel/static/delete.png'
import { useNavigate, useParams } from 'react-router-dom'
import { LangContext } from '../../../contexts/langContext'

function ItemsToolBar({showCRUBButtons, handleDelete, handleExportToCSV, setShowModal, emptyTable}){
    const {l} = useContext(LangContext)
    const { collectionId } = useParams()
    const navigate = useNavigate()
    return(
        <div className="ps-5 row justify-content-start w-100">
            {showCRUBButtons &&
                <>
                    <button
                        className="btn btn-primary m-1 px-4 col-auto"
                        onClick={()=>navigate(`/create-item/${collectionId}`)}
                    >
                        + {l('New item', 'Новый айтем')}
                    </button>
                    {!emptyTable && <button
                        onClick={handleDelete}
                        className="btn btn-danger px-4 m-1 col-auto"
                    >
                        <img src={deleteIcon} height={25} />
                    </button>}
                </>
            }
            {!emptyTable && <button
                onClick={handleExportToCSV}
                className="btn btn-primary col-auto px-4 m-1"
            >
                {l('Export to CSV', 'Экспортировать в CSV')}
            </button>}
            <button
                onClick={()=>setShowModal(true)}
                className="btn btn-primary col-auto px-4 m-1"
            >
                {l('Filter', 'Фильтр')}
            </button>
        </div>
    )
}

export { ItemsToolBar }