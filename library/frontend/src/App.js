//import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthorList from './components/Author.js'
import UserList from './components/User.js'
import BookList from './components/Book.js'
import ToDoList from './components/ToDo.js'
import ProjectList from './components/Project.js'
import LoginForm from './components/Auth.js'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';


const NotFound404 = ({location}) => {
    return(
        <div>
            <h1>Страница по адресу `{location.pathname}` не найдена! :( </h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'books': [],
            'authors': [],
            'notes': [],
            'projects': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token})
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token})
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    load_data() {
        axios.get('http://127.0.0.1:8000/api/authors')
            .then(response => {
                this.setState({authors: response.data.results})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/user')
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/books')
            .then(response => {
                this.setState({books: response.data.results})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/toDo')
            .then(response => {
                this.setState({notes: response.data.results})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul className="menu">
                            <li>
                                <Link to='/'>Authors</Link>
                            </li>
                            <li>
                                <Link to='/user'>Users</Link>
                            </li>
                            <li>
                                <Link to='/books'>Books</Link>
                            </li>
                            <li>
                                <Link to='/todos'>Notes</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <AuthorList authors={this.state.authors} />} />
                        <Route exact path='/books' component={() => <BookList books={this.state.books} />} />
                        <Redirect from='/authors' to='/' />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route exact path='/user' component={() => <UserList users={this.state.users} />} />
                        <Route exact path='/todos' component={() => <ToDoList notes={this.state.notes} />} />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                        <Route component={NotFound404} />
                    </Switch>
                </BrowserRouter>
                <div className="footer">Footer</div>
            </div>
        )
    }
}

export default App;



