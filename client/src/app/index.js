

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from '../components'
import { BooksList, BooksAdd, BooksUpdate, FinnaBook } from '../components'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router >
            <NavBar />
            <Switch >
                <Route path="/books/list" exact component={BooksList} />
                <Route path="/books/add" exact component={BooksAdd} />
                <Route path="/books/update/:id" exact component={BooksUpdate} />
                <Route path="/books/finnabook" exact component={FinnaBook} />
            </Switch>
        </Router>
    )
}

export default App



