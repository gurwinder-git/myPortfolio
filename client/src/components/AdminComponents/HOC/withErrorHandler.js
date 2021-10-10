import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";

function withErrorHandler(WarappedComponent, axios) {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null })
                return req
            })

            this.responseIntercepter = axios.interceptors.response.use((res) => {
                // if (res === undefined)
                //     this.setState({ error: 'Something went wrong' })
                return res
            }, (error) => {
                if (error.response)
                    this.setState({ error: error.response.data.error })
                else
                    this.setState({ error: error.message })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseIntercepter)
        }


        errorConformHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error} clicked={this.errorConformHandler} zIndex={6}>
                        {this.state.error}
                    </Modal>
                    <WarappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler