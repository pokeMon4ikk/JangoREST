import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr className="tab-content">
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
        </tr>
    )
}
const ProjectList = ({projects}) => {
    return(
        <table className="table">
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
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList