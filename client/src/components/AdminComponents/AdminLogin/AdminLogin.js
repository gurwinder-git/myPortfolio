import React, { Component } from 'react'
import css from "./AdminLogin.module.css"
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../HOC/withErrorHandler'
import axios from 'axios'

export class AdminLogin extends Component {
    state = {
        loading: true,
        adminDetails: {
            adminId: "",
            password: ""
        },
        disabled: false
    }

    componentDidMount() {

        axios.get('http://localhost:4000/admin/verify/authenticationAPI', { withCredentials: true })
            .then((res) => {
                if (!res.data.error)
                    this.props.history.push('/admin/projects')

                else
                    this.setState({ loading: false })
            })
            .catch((error) => {
                console.log("catch", error)
                this.setState({ loading: false })
            })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        this.setState({ disabled: true })
        const formData = {}

        for (let key in this.state.adminDetails) {
            formData[key] = this.state.adminDetails[key]
        }

        axios.post('http://localhost:4000/admin/loginAPI', formData, { withCredentials: true })
            .then(res => {
                // console.log(res)
                if (res)
                    this.props.history.push('/admin/projects')
                else
                    this.setState({ disabled: false })
            })
            .catch(error => {
                console.log("catch [AdminLogin.js]", error)
                this.setState({ disabled: false })
            })
    }

    inputHandler = (event) => {
        const { name, value } = event.target
        const updatedForm = { ...this.state.adminDetails }
        updatedForm[name] = value
        this.setState({ adminDetails: updatedForm })
    }

    render() {
        const loginBtn = this.state.disabled ?
            <button disabled>Please wait...</button> :
            <button>Login</button>
        return (
            this.state.loading ? <Spinner /> :
                <form className={css.adminForm} onSubmit={this.handleFormSubmit} >
                    <h1>Admin Panel</h1>
                    <div className={css.inputFeild} disabled={this.state.disabled}>
                        <i className="bi bi-person-fill"></i>
                        <input type="text"
                            name="adminId"
                            placeholder="Admin Id"
                            onChange={this.inputHandler}
                            value={this.state.adminDetails.adminId} />
                    </div>
                    <div className={css.inputFeild} disabled={this.state.disabled}>
                        <i className="bi bi-shield-lock-fill"></i>
                        <input type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.inputHandler}
                            value={this.state.adminDetails.password} />
                    </div>
                    {loginBtn}
                </form>
        )
    }
}

export default withErrorHandler(AdminLogin, axios)
