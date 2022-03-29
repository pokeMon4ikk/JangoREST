import React from 'react'

const ToDo = ({note}) => {
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
        </tr>
    )
}
const ToDoList = ({notes}) => {
    return(
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
            {notes.map((note) => <ToDo note={note} />)}
        </table>
    )
}

export default ToDoList