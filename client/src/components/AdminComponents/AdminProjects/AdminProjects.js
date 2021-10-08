import React, { Component } from 'react'
import css from './AdminProjects.module.css'
import ProjectCard from './ProjectCard/ProjectCard'
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../HOC/withErrorHandler'
import axios from 'axios'
import Model from '../MainModel/MainModel'
import ProgressBar from '../../UI/progressBar/progressBar'

export class AdminProjects extends Component {

    state = {
        loading: true,
        displayForm: false,
        projectForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    name: 'title',
                    type: 'text',
                    placeholder: 'Project title'
                },
                label: "Title",
                errorMessage: null,
                value: '',
                validInput: true,
            },
            link: {
                elementType: 'input',
                elementConfig: {
                    name: 'link',
                    type: 'text',
                    placeholder: 'Project link'
                },
                label: "Link",
                errorMessage: null,
                value: '',
                validInput: true
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    name: 'description',
                    type: 'text',
                    placeholder: 'Project description'
                },
                label: "Description",
                errorMessage: null,
                value: '',
                validInput: true
            }
        },
        image: {
            data: null,
            imageError: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/admin/get/projectsAPI', { withCredentials: true })
            .then((res) => {
                if (res.data.error) {
                    this.props.history.push('/admin/login')
                } else {
                    // console.log(res.data)
                    this.setState({ loading: false })
                }
            })
            .catch((error) => {
                this.props.history.push('/admin/login')
                console.log('[Admin projects] catch', error)
            })
    }

    addProjectHandler = () => {
        this.setState({ displayForm: true })
    }

    hideFormHandler = () => {
        this.setState({ displayForm: false })
    }

    cancelFormHandler = (event) => {
        event.preventDefault()
        this.setState({ displayForm: false })
    }

    inputHandler = (event, inputName) => {
        const projectForm = { ...this.state.projectForm }
        projectForm[inputName].value = event.target.value
        this.setState({ projectForm })
    }

    fileInputHandler = (event) => {
        const imageState = { ...this.state.image }

        if (event.target.files[0].type.includes('image')) {
            imageState.data = event.target.files[0]
            imageState.imageError = null
        }
        else {
            imageState.imageError = "File not supported"
            imageState.data = null
        }

        this.setState({ image: imageState })
    }

    formSubmitHandler = (event) => {
        event.preventDefault()

        const formState = { ...this.state.projectForm }

        for (let key in formState) {
            const { value } = formState[key]
            switch (key) {
                case 'title':
                    if (value.length < 5)
                        formState[key].errorMessage = 'Title must contain atleast 5 characters.'

                    else
                        formState[key].errorMessage = null

                    break;

                case 'link':
                    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
                    const regex = new RegExp(expression)
                    if (!value.match(regex))
                        formState[key].errorMessage = 'Invalid URL'

                    else
                        formState[key].errorMessage = null

                    break;

                case 'description':
                    if (value.length < 10)
                        formState[key].errorMessage = 'Description must contain atleast 10 characters.'

                    else
                        formState[key].errorMessage = null

                    break;

                default:
                    break;
            }
        }
        this.setState({ projectForm: formState })

        const imageState = { ...this.state.image }
        if (imageState.data == null) {
            imageState.imageError = "Please select image file."
            this.setState({ image: imageState })
            return
        } else {
            imageState.imageError = null
            this.setState({ image: imageState })
        }


        for (let key in formState) {
            if (formState[key].errorMessage)
                return
        }

        //now every thing is validated



    }

    render() {
        const onFormStyle = {
            overflow: this.state.displayForm ? 'hidden' : null,
            height: '100vh'
        }

        const projectFormArray = []

        for (let key in this.state.projectForm) {
            projectFormArray.push({
                id: key,
                config: this.state.projectForm[key]
            })
        }
        // console.log(projectFormArray)

        const formItems = projectFormArray.map((item) => {
            return (
                <div key={item.id}>
                    <label>{item.config.label}</label>
                    <input {...item.config.elementConfig}
                        value={item.config.value}
                        style={{ borderColor: item.config.errorMessage ? '#ff000078' : 'grey', backgroundColor: item.config.errorMessage ? '#ff00000f' : null }}
                        onChange={event => { this.inputHandler(event, item.config.elementConfig.name) }} />
                    <small>{item.config.errorMessage}</small>
                </div>
            )
        })

        return (
            this.state.loading ?
                <Spinner /> :
                <div className={css.adminProjects} style={onFormStyle}>

                    <nav>
                        <button className={[css.addProjects, css.btn].join(' ')} onClick={this.addProjectHandler}>
                            <i className="bi bi-plus-lg"></i> Add Project
                        </button>
                        <button className={[css.logout, css.btn].join(' ')}>
                            <i className="bi bi-box-arrow-right"></i> Logout
                        </button>
                    </nav>

                    <Model show={this.state.displayForm} clicked={this.hideFormHandler} zIndex={4}>
                        <h2 className={css.formHeading}>Enter Project Details</h2>
                        <form className={css.addProjectForm}>

                            {formItems}

                            <div>
                                <label>Screenshoot</label>
                                <input type="file"
                                    name="image"
                                    onChange={this.fileInputHandler}
                                    style={{ borderColor: this.state.image.imageError ? '#ff000078' : 'grey', backgroundColor: this.state.image.imageError ? '#ff00000f' : null }} />
                                <small>{this.state.image.imageError}</small>
                            </div>
                            <ProgressBar width={'30%'} />

                            <div style={{ display: 'flex', flexDirection: "row" }}>
                                <button className={css.submitBtn} onClick={this.formSubmitHandler}>Submit</button>
                                <button className={css.cancelBtn} onClick={this.cancelFormHandler}>cancel</button>
                            </div>

                        </form>
                    </Model>

                    <main className={css.projectCardContainer}>
                        <ProjectCard />
                        <ProjectCard />
                    </main>
                </div>
        )
    }
}

export default withErrorHandler(AdminProjects, axios)
