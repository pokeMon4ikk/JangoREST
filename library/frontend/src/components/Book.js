import React from 'react'

const BookItem = ({book}) => {
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
       </tr>
    )
}

const BookList = ({books}) => {
    return (
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
            {books.map((book) => <BookItem book={book} />)}
       </table>
    )
}

export default BookList