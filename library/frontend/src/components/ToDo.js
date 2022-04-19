import React from 'react'
import {Link} from 'react-router-dom'

const ToDo = ({note, deleteToDo}) => {
    return (
        <tr className="tab-content">
            <td>
                {note.id}
            </td>
            <td>
                {note.name}
            </td>
            <td>
                {note.text}
            </td>
            <td>
                {note.author}
            </td>
            <td>
                <button onClick={() => deleteToDo(note.id)} type='button'>
                    Delete
                </button>
            </td>
        </tr>
    )
}
const ToDoList = ({notes, deleteToDo}) => {
    return(
        <div>
            <Link to='/todos/create' className="link">Create new</Link>
            <table className="table">
                <th>
                    ID
                </th>
                <th>
                    Название
                </th>
                <th>
                    Текст
                </th>
                <th>
                    Автор
                </th>
                <th>
                </th>
                {notes.map((note) => <ToDo note={note} deleteToDo={deleteToDo} />)}
            </table>
        </div>
    )
}

export default ToDoList