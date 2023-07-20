import { ItemsTableBody } from './itemsTableBody'
import { ItemsTableHead } from './itemsTableHead'
import { useContext } from 'react'
import { ThemeContext } from '../../../contexts/themeContext'

function ItemsTable(props){
    const {t} = useContext(ThemeContext)
    
    return(
        <table className={"table table-hover mt-4"+t()}>
            <ItemsTableHead {...props}/>
            <ItemsTableBody {...props}/>
        </table>
    )
}

export { ItemsTable }