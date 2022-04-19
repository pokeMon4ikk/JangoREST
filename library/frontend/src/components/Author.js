import React from 'react'
import {Link} from 'react-router-dom'

const AuthorItem = ({author, deleteAuthor}) => {
   return (
       <tr className="tab-content">
           <td>
               {author.uid}
           </td>
           <td>
               {author.first_name}
           </td>
           <td>
               {author.last_name}
           </td>
           <td>
               {author.birthday_year}
           </td>
           <td>
                <button onClick={() => deleteAuthor(author.uid)} type="button">
                    Delete
                </button>
           </td>
       </tr>
   )
}


const AuthorList = ({authors, deleteAuthor}) => {
   return (
       <div>
           <Link to='/authors/create' className="link">Create new</Link>
           <table className="table">
               <th>
                   UID
               </th>
               <th>
                   Имя
               </th>
               <th>
                   Фамилия
               </th>
               <th>
                   Год рождения
               </th>
               {authors.map((author) => <AuthorItem author={author} deleteAuthor={deleteAuthor}/>)}
           </table>
       </div>
   )
}


export default AuthorList

