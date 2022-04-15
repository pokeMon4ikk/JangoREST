import React from 'react'

class TodoForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {name: '', text: '', author: ''}
    }

    handleChange(event)
        {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
        }

    handleSubmit(event){
        this.props.createToDo(this.state.name, this.state.text, this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="name">Название: </label>
                    <input type="text" className="form-control" name="name"
                    value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="text">Текст: </label>
                    <input type="text" className="form-control" name="text"
                    value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="author">Автор: </label>
                    <input type="text" className="form-control" name="author"
                    value={this.state.author} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm