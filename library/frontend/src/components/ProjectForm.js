import React from 'react'

class ProjectForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {name: '', description: '', link_to_repo: '', devs: '', Todo: props.notes[0].id}
    }

    handleChange(event)
        {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
        }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.description, this.state.link_to_repo, this.state.devs, this.state.Todo)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="name">Название проекта: </label>
                    <input type="text" className="form-control" name="name"
                    value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="description">Описание: </label>
                    <input type="text" className="form-control" name="description"
                    value={this.state.description} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="link_to_repo">Ссылка на репозиторий: </label>
                    <input type="text" className="form-control" name="link_to_repo"
                    value={this.state.link_to_repo} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="devs">Разработчик(и): </label>
                    <input type="text" className="form-control" name="devs"
                    value={this.state.devs} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="author">Отзыв: </label>
                    <select name="author" className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.notes.map((note)=><option value={note.id}>{note.name} {note.author}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm;