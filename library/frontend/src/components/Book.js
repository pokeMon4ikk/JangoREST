import React from 'react'
import {Link} from 'react-router-dom'


const BookItem = ({book, deleteBook}) => {
    return (
        <tr className="tab-content">
            <td>
                {book.id}
            </td>
            <td>
                {book.name}
            </td>
            <td>
                {book.author}
            </td>
            <td>
                <button onClick={() => deleteBook(book.id)} type="button">
                    Delete
                </button>
            </td>
       </tr>
    )
}

const BookList = ({books, deleteBook}) => {
    return (
        <div>
            <Link to='/books/create' className="link">Create new</Link>
            <table className="table">
                <th>
                    ID
                </th>
                <th>
                    Название
                </th>
                <th>
                    Автор
                </th>
                <th></th>
                {books.map((book) => <BookItem book={book}  deleteBook={deleteBook}/>)}
           </table>
       </div>
    )
}

export default BookList