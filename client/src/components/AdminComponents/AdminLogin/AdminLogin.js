import React, { Component } from 'react'
import css from "./AdminLogin.module.css"
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../HOC/withErrorHandler'

export class AdminLogin extends Component {
    state = {
        loading: true,
        adminDetails: {
            adminId: "",
            password: ""
        }
    }

    componentDidMount() {
        const req = {
            status: 400
        }
        // if loggedin
        if (req.status === 200)
            this.props.history.push('/admin/projects')
        else //is not logged in
            this.setState({ loading: false })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
    }

    inputHandler = (event) => {
        const { name, value } = event.target
        const updatedForm = { ...this.state.adminDetails }
        updatedForm[name] = value
        this.setState({ adminDetails: updatedForm })
    }

    render() {
        return (
            this.state.loading ? <Spinner /> :
                <form className={css.adminForm} onSubmit={this.handleFormSubmit}>
                    <h1>Admin Panel</h1>
                    <div className={css.inputFeild}>
                        <i className="bi bi-person-fill"></i>
                        <input type="text"
                            name="adminId"
                            placeholder="Admin Id"
                            onChange={this.inputHandler}
                            value={this.state.adminDetails.adminId} />
                    </div>
                    <div className={css.inputFeild}>
                        <i className="bi bi-shield-lock-fill"></i>
                        <input type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.inputHandler}
                            value={this.state.adminDetails.password} />
                    </div>
                    <button>Login</button>
                </form>
        )
    }
}

export default withErrorHandler(AdminLogin)
