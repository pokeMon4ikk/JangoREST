import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr className="tab-content">
            <td>
                {project.uid}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.description}
            </td>
            <td>
                {project.link_to_repo}
            </td>
            <td>
                {project.devs}
            </td>
            <td>
                {project.Todo}
            </td>
            <td>
                <button onClick={() => deleteProject(project.uid)} type="button">
                    Delete
                </button>
            </td>
        </tr>
    )
}
const ProjectList = ({projects, deleteProject}) => {
    return(
        <div>
            <Link to='/projects/create' className="link">Create new</Link>
            <table className="table">
                <th>
                    UID
                </th>
                <th>
                    Название
                </th>
                <th>
                   Описание
                </th>
                <th>
                    Ссылка на репозиторий
                </th>
                <th>
                    Разработчики
                </th>
                <th>
                    Заметка
                </th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
        </div>
    )
}

export default ProjectList