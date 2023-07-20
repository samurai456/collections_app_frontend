import { useContext } from 'react'
import { PermissionContext } from '../../contexts/permissionContext'
import { LangContext } from '../../contexts/langContext'

function TableHead({authorId}){
    const {l} = useContext(LangContext)
    const {permission} = useContext(PermissionContext)
    return(
        <thead>
            <tr>
                <th>{l('Name','Название')}</th>
                <th>{l('Topic','Тематика')}</th>
                { !authorId&& <th>{l('Author','Автор')}</th> }
                <th>{l('Items','Айтемов')}</th>
                { authorId&& (authorId===sessionStorage.userId||permission==='admin') && <th></th> }
            </tr>
        </thead>
    )
}

export { TableHead }