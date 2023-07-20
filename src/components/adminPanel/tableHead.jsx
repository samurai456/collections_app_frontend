import { useState } from 'react'

function TableHead({users, setUsers, sortBy, setSortBy, setOrder}){

    function sortUsersBy(field){
        setSortBy(field);
        setOrder(o=>!o)
    }

    function handleChange(e){
        setUsers(old=>old.map(i=>({...i, checked: e.target.checked})));
    }

    const btnStyle = ' h-100 w-100 btn '
    return(
        <thead>
            <tr>
                <th className="text-center">
                    <input 
                        type="checkbox" 
                        onChange={handleChange}
                        checked={users.every(i=>i.checked)}
                    />
                </th>
                <th>
                    <button 
                        className={btnStyle + (sortBy==='_id'?'btn-dark': 'btn-light')}
                        onClick={()=>sortUsersBy('_id')}
                    >
                        ID
                    </button>
                </th>
                <th>
                    <button
                        className={btnStyle + (sortBy==='nickname'?'btn-dark': 'btn-light')}
                        onClick={()=>sortUsersBy('nickname')}
                    >
                        Nickname
                    </button>
                </th>
                <th> 
                    <button
                        className={btnStyle + (sortBy==='email'?'btn-dark': 'btn-light')}
                        onClick={()=>sortUsersBy('email')}
                    >
                        Email
                    </button>
                </th>
                <th>
                    <button
                        className={btnStyle + (sortBy==='registrationDate'?'btn-dark': 'btn-light')}
                        onClick={()=>sortUsersBy('registrationDate')}
                    >
                        Registration date
                    </button>
                </th>
                <th>
                    <button
                        className={btnStyle + (sortBy==='lastLoginDate'?'btn-dark': 'btn-light')}
                        onClick={()=>sortUsersBy('lastLoginDate')}
                    >
                        Last login date
                    </button>
                </th>
                <th>
                    <button
                        className={btnStyle + (sortBy==='status'?'btn-dark': 'btn-light')}
                        onClick={()=>sortUsersBy('status')}
                    >
                        Status
                    </button>
                </th>
                <th>
                    <button
                        className={btnStyle + (sortBy==='isAdmin'?'btn-dark': 'btn-light')}
                        onClick={()=>sortUsersBy('isAdmin')}
                    >
                        is admin
                    </button>
                </th>
            </tr>
        </thead>
    )
}

export { TableHead }