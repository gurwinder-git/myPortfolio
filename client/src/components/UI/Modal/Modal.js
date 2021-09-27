import React, { Component } from 'react'
import css from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop'

class Modal extends Component {

    render() {

        const modalStyle = {
            top: this.props.show ? '16vh' : '-17vh',
            opacity: this.props.show ? 1 : 0
        }

        return (
            <>
                <div className={css.modal} style={modalStyle}>
                    {this.props.children}
                </div>
                <BackDrop show={this.props.show} clicked={this.props.clicked} />
            </>
        )
    }
}

export default Modal
