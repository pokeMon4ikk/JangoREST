import React from 'react'
import {Link} from 'react-router-dom'

const UserItem = ({user, deleteUsers}) => {
    return (
        <tr className="tab-content">
            <td>
            {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.birthday_year}
            </td>
            <td>
                {user.age}
            </td>
            <td>
                <button onClick={() => deleteUsers(user.id)} type="button">
                    Delete
                </button>
            </td>
       </tr>
    )
}

const UserList = ({users, deleteUsers}) => {
    return (
        <div>
            <Link to='/user/create' className="link">Create new</Link>
            <table className="table">

                <th>
                    Имя
                </th>
                <th>
                    Фамилия
                </th>
                <th>
                    Год Рождения
                </th>
                <th>
                    Возраст
                </th>
                <th>
                </th>
                {users.map((user) => <UserItem user={user} deleteUsers={deleteUsers}/>)}
           </table>
       </div>
    )
}

export default UserList