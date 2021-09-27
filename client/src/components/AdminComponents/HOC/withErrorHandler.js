import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";

function withErrorHandler(WarappedComponent) {
    return class extends Component {
        state = {
            error: null
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