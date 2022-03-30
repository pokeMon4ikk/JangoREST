//import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthorList from './components/Author.js'
import UserList from './components/User.js'
import BookList from './components/Book.js'
import ToDoList from './components/ToDo.js'
import ProjectList from './components/Project.js'
import axios from 'axios'
import {BrowserRouter, HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

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
            'projects': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/user')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/authors')
            .then(response => {
                const authors = response.data.results
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/books')
            .then(response => {
                const books = response.data.results
                this.setState(
                    {
                        'books': books
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/toDo')
            .then(response => {
                const notes = response.data.results
                this.setState(
                    {
                        'notes': notes
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

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
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <AuthorList authors={this.state.authors} />} />
                        <Route exact path='/books' component={() => <BookList books={this.state.books} />} />
                        <Redirect from='/authors' to='/' />
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



