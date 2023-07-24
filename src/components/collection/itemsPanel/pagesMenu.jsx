import { useContext } from "react"
import { LangContext } from "../../../contexts/langContext"

function PagesMenu({totalPages, currentPage, setCurrentPage}){
    const {l} = useContext(LangContext)
    return(
        <div className="row">
            <button 
                onClick={()=>setCurrentPage(currentPage-1)}
                disabled={currentPage===1}
                className="m-1 btn btn-primary col-auto"
            >
                {l('prev','пред.')}
            </button>
            {Array(totalPages).fill(1).map((i, ind)=>
                <button 
                    key={ind}
                    onClick={e=>setCurrentPage(ind+1)}
                    className={"m-1 col-auto btn btn-"+(ind+1===currentPage? 'info': 'light')}
                >
                    {ind+1}
                </button>
            )}
            <button 
                onClick={()=>setCurrentPage(currentPage+1)}
                disabled={currentPage===totalPages}
                className="m-1 btn btn-primary col-auto"
            >
                {l('next','след.')}
            </button>
        </div>
    )
}

export {PagesMenu}