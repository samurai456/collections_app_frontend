import { TableHead } from './tableHead'
import { TableBody } from './tableBody'
import { useState, useContext } from 'react'
import { ThemeContext } from '../../contexts/themeContext'

function Table({users, setUsers, sortBy, setSortBy, setOrder}){
    const {t} = useContext(ThemeContext)

    return(
        <table className={"table table-striped mt-4"+t()}>
            <TableHead 
                users={users} 
                setUsers={setUsers}
                sortBy={sortBy}
                setSortBy={setSortBy} 
                setOrder={setOrder}
            />
            <TableBody users={users} setUsers={setUsers} />
        </table>
    )
}

export { Table }