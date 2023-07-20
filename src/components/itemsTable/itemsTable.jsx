import { useContext } from 'react'
import { TableBody } from './tableBody'
import { TableHead } from './tableHead'
import loadingGif from '../adminPanel/static/loading.gif'
import { ThemeContext } from '../../contexts/themeContext'

function ItemsTable({items}){
    const {t} = useContext(ThemeContext)

    if(items === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    return(
        <div className="px-4">
            <table className={"fs-5 table table-hover table-striped"+t()}>
                <TableHead />
                <TableBody items={items} />
            </table>
        </div>
    )
}

export { ItemsTable }