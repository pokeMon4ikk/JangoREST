import React from 'react'

const UserItem = ({user}) => {
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
                {user.gender}
            </td>
            <td>
                {user.age}
            </td>
       </tr>
    )
}

const UserList = ({users}) => {
    return (
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
                Пол
            </th>
            <th>
                Возраст
            </th>
            {users.map((user) => <UserItem user={user} />)}
       </table>
    )
}

export default UserList