import React, { Component } from 'react'
import css from './AdminProjects.module.css'
import ProjectCard from './ProjectCard/ProjectCard'
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../HOC/withErrorHandler'
import axios from 'axios'

export class AdminProjects extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        axios.get('http://localhost:4000/admin/get/projectsAPI', { withCredentials: true })
            .then((res) => {
                if (res.data.error) {
                    this.props.history.push('/admin/login')
                } else {
                    console.log(res.data)
                    this.setState({ loading: false })
                }
            })
            .catch((error) => {
                this.props.history.push('/admin/login')
                console.log('[Admin projects] catch', error)
            })
    }

    render() {
        return (
            this.state.loading ?
                <Spinner /> :
                <div className={css.adminProjects}>
                    <nav>
                        <button className={[css.addProjects, css.btn].join(' ')}>
                            <i className="bi bi-plus-lg"></i> Add Project
                        </button>
                        <button className={[css.logout, css.btn].join(' ')}>
                            <i className="bi bi-box-arrow-right"></i> Logout
                        </button>
                    </nav>

                    <main className={css.projectCardContainer}>
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                    </main>
                </div>
        )
    }
}

export default withErrorHandler(AdminProjects, axios)
