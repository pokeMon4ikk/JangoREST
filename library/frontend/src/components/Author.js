import React from 'react'


const AuthorItem = ({author}) => {
   return (
       <tr className="tab-content">
           <td>
               {author.first_name}
           </td>
           <td>
               {author.last_name}
           </td>
           <td>
               {author.birthday_year}
           </td>
       </tr>
   )
}


const AuthorList = ({authors}) => {
   return (
       <table className="table">
           <th>
               Имя
           </th>
           <th>
               Фамилия
           </th>
           <th>
               Год рождения
           </th>
           {authors.map((author) => <AuthorItem author={author} />)}
       </table>
   )
}


export default AuthorList

