import React, { Component } from 'react'
import AdminLogin from './components/AdminComponents/AdminLogin/AdminLogin'
import AdminProjects from './components/AdminComponents/AdminProjects/AdminProjects'
import HomePage from './components/Homepage/HomePage'
import { Route, Switch, withRouter } from 'react-router-dom'
import { fetchProjects } from './store/actions/adminProjectsActionCreator'
import { connect } from 'react-redux'

export class App extends Component {
    componentDidMount() {
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (((scrollTop + clientHeight) >= (scrollHeight - 100)) && (this.props.dataFetchLoading == false)) {
                this.props.fetchProjects(this.props.history.push)
            }
        })

        window.addEventListener("resize", function (event) {
            console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight + ' high');
        })
    }

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

const mapStateToProps = (state) => {
    return {
        dataFetchLoading: state.adminProjects.dataFetchLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: (redirectFunc) => dispatch(fetchProjects(redirectFunc))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
