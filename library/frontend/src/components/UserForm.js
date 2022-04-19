import React from 'react'


class UserForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {first_name: '', last_name: '', birthday_year: 0, age: 0}
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
        this.props.createUser(this.state.first_name, this.state.last_name, this.state.birthday_year, this.state.age)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="first_name">Имя: </label>
                    <input type="text" className="form-control" name="first_name"
                    value={this.state.first_name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="last_name">Фамилия: </label>
                    <input type="text" className="form-control" name="last_name"
                    value={this.state.last_name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="birthday_year">Год рождения: </label>
                    <input type="text" className="form-control" name="birthday_year"
                    value={this.state.birthday_year} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="age">Возраст: </label>
                    <input type="text" className="form-control" name="age"
                    value={this.state.age} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn-primary" value="Save" />
            </form>
        );
    }
}

export default UserForm