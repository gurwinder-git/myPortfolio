import React, { Component } from 'react'
import AdminLogin from './components/AdminComponents/AdminLogin/AdminLogin'
import AdminProjects from './components/AdminComponents/AdminProjects/AdminProjects'
import HomePage from './components/Homepage/HomePage'
import { Route, Switch } from 'react-router-dom'

export class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/admin/login" component={AdminLogin} />
                    <Route exact path="/admin/projects" component={AdminProjects} />
                </Switch>
            </>
        )
    }
}

export default App
