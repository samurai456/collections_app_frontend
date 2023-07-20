import { useContext } from 'react'
import loadingGif from '../adminPanel/static/loading.gif'
import { TableHead } from './tableHead'
import { TableBody } from './tableBody'
import { ThemeContext } from '../../contexts/themeContext'

function CollectionsTable({collections, authorId, handleDelete}){
    const {t} = useContext(ThemeContext)

    if(collections === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    return(
        <div className="px-3">
            <table className={"table table-hover table-striped fs-5"+t()}>
                <TableHead authorId={authorId}/>
                <TableBody 
                    collections={collections} 
                    authorId={authorId}
                    handleDelete={handleDelete}
                />
            </table>
        </div>
    )
        
}

export { CollectionsTable }