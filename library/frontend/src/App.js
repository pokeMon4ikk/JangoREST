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
import BookForm from './components/BookForm.js'
import AuthorForm from './components/AuthorForm.js'
import ToDoForm from './components/ToDoForm.js'
import ProjectForm from './components/ProjectForm.js'
import UserForm from './components/UserForm.js'

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
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())

    }

    get_token(username, password) {
        axios.post('http://151.248.123.168:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
            this.set_token(response.data['token'])
            console.log(response.data)
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
    if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://151.248.123.168:8000/api/authors', {headers})
            .then(response => {
                this.setState({authors: response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({authors: []})
            })

        axios.get('http://151.248.123.168:8000/api/user', {headers})
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({users: []})
            })

        axios.get('http://151.248.123.168:8000/api/books', {headers})
            .then(response => {
                this.setState({books: response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({books: []})
            })

        axios.get('http://151.248.123.168:8000/api/toDo', {headers})
            .then(response => {
                this.setState({notes: response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({notes: []})
            })

        axios.get('http://151.248.123.168:8000/api/project', {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })

    }
    deleteAuthor(uid){
        const headers = this.get_headers()
        axios.delete(`http://151.248.123.168:8000/api/authors/${uid}`, {headers})
            .then(response => {
                this.setState({authors: this.state.authors.filter((author) => author.uid !== uid)})
            }).catch(error => console.log(error))
    }

    deleteBook(id){
        const headers = this.get_headers()
        axios.delete(`http://151.248.123.168:8000/api/books/${id}`, {headers})
            .then(response => {
                this.setState({books: this.state.books.filter((book) => book.id !== id)})
            }).catch(error => console.log(error))
    }

    deleteProject(uid){
        const headers = this.get_headers()
        axios.delete(`http://151.248.123.168:8000/api/project/${uid}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((project) => project.uid !== uid)})
            }).catch(error => console.log(error))
    }
    deleteToDo(id){
        const headers = this.get_headers()
        axios.delete(`http://151.248.123.168:8000/api/toDo/${id}`, {headers})
            .then(response => {
                this.setState({notes: this.state.notes.filter((note) => note.id !== id)})
            }).catch(error => console.log(error))

    }
    deleteUsers(id) {
        const headers = this.get_headers()
        axios.delete(`http://151.248.123.168:8000/api/user/${id}`, {headers})
            .then(response => {
                this.setState({users: this.state.users.filter((user) => user.id !== id)})
            }).catch(error => console.log(error))
    }
    createUser(first_name, last_name, birthday_year, age) {
        const headers = this.get_headers()
        const data = {first_name:first_name, last_name:last_name,  birthday_year:birthday_year, age:age}
        axios.post(`http://151.248.123.168:8000/api/user/`, data, {headers})
            .then(response => {
                let newUser = response.data
                this.setState({users: [...this.state.users, newUser]})
            }).catch(error => console.log(error))
    }

    createBook(name, author) {
        const headers = this.get_headers()
        const data = {name: name, author: author}
        axios.post(`http://151.248.123.168:8000/api/books/`, data, {headers})
            .then(response => {
                let newBook = response.data
                const author = this.state.authors.filter((author) => author.uid === newBook.author)[0]
                newBook.author = author
                this.setState({books: [...this.state.books, newBook]})
            }).catch(error => console.log(error))
    }

    createAuthor(first_name, last_name, birthday_year) {
        const headers = this.get_headers()
        const data = {first_name:first_name, last_name:last_name, birthday_year:birthday_year}
        axios.post(`http://151.248.123.168:8000/api/authors/`, data, {headers})
            .then(response => {
                let newAuthor = response.data
                this.setState({authors: [...this.state.authors, newAuthor]})
            }).catch(error => console.log(error))
    }

    createToDo(name, text, author) {
        const headers = this.get_headers()
        const data = {name:name, text:text, author:author}
        axios.post(`http://151.248.123.168:8000/api/toDo/`, data, {headers})
            .then(response => {
                let newTodo = response.data
                this.setState({notes: [...this.state.notes, newTodo]})
            }).catch(error => console.log(error))
    }

    createProject(name, description, link_to_repo, devs, Todo){
        const headers = this.get_headers()
        const data = {name:name, description:description, link_to_repo:link_to_repo, devs:devs, Todo:Todo}
        axios.post(`http://151.248.123.168:8000/api/project/`, data, {headers})
            .then(response => {
                let newProject = response.data
                const Todo = this.state.notes.filter((note) => note.id === newProject.Todo)[0]
                newProject.Todo = Todo
                this.setState({projects: [...this.state.projects, newProject]})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
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
                        <Route exact path='/' component={() => <AuthorList authors={this.state.authors} deleteAuthor={(uid) => this.deleteAuthor(uid)} />} />
                        <Route exact path='/authors/create' component={() => <AuthorForm authors={this.state.authors}
                        createAuthor={(first_name, last_name, birthday_year) => this.createAuthor(first_name, last_name, birthday_year)} />} />
                        <Route exact path='/books/create' component={() => <BookForm authors={this.state.authors} createBook={(name, author) => this.createBook(name, author)} />} />
                        <Route exact path='/books' component={() => <BookList books={this.state.books} deleteBook={(id) => this.deleteBook(id)} />} />
                        <Redirect from='/authors' to='/' />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route exact path='/user' component={() => <UserList users={this.state.users} deleteUsers={(id) => this.deleteUsers(id)} />} />
                        <Route exact path='/user/create' component={() => <UserForm users={this.state.users}
                        createUser={(first_name, last_name, birthday_year, age) => this.createUser(first_name, last_name, birthday_year, age)} />} />
                        <Route exact path='/todos' component={() => <ToDoList notes={this.state.notes} deleteToDo={(id) => this.deleteToDo(id)} />} />
                        <Route exact path='/todos/create' component={() => <ToDoForm notes={this.state.notes} createToDo={(name, text, author) => this.createToDo(name, text, author)} />} />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(uid) => this.deleteProject(uid)} />} />
                        <Route exact path='/projects/create' component={() => <ProjectForm notes={this.state.notes}
                        createProject={(name, description, link_to_repo, devs, Todo) => this.createProject(name, description, link_to_repo, devs, Todo)} />} />
                        <Route component={NotFound404} />
                    </Switch>
                </BrowserRouter>
                <div className="footer">Footer</div>
            </div>
        )
    }
}

export default App;



