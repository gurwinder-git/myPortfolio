import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";

function withErrorHandler(WarappedComponent, axios) {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            axios.interceptors.request.use((req) => {
                this.setState({ error: null })
                return req
            })

            axios.interceptors.response.use((res) => {
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

        errorConformHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error} clicked={this.errorConformHandler}>
                        {this.state.error}
                    </Modal>
                    <WarappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler