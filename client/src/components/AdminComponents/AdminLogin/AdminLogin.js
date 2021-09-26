import React, { Component } from 'react'
import css from "./AdminLogin.module.css"

export class AdminLogin extends Component {
    state = {
        isAdminLoggedIn: true
    }
    componentDidMount() {
        if (this.state.isAdminLoggedIn)
            this.props.history.push('/admin/projects')
    }
    render() {
        return (
            <form className={css.adminForm}>
                <h1>Admin Panel</h1>
                <div className={css.inputFeild}>
                    <i class="bi bi-person-fill"></i>
                    <input type="text" name="adminId" placeholder="Admin Id" />
                </div>
                <div className={css.inputFeild}>
                    <i class="bi bi-shield-lock-fill"></i>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button>Login</button>
            </form>
        )
    }
}

export default AdminLogin
