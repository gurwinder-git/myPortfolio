import React, { Component } from 'react'
import css from './MainModel.module.css'
import BackDrop from '../../UI/BackDrop/BackDrop'

export class MainModel extends Component {

    render() {
        const formStyle = {
            top: this.props.show ? '16vh' : '-800px',
            opacity: this.props.show ? 1 : 0,
            zIndex: this.props.zIndex
        }
        return (
            <>
                <div className={css.model} style={formStyle}>
                    {this.props.children}
                </div>
                <BackDrop show={this.props.show} clicked={this.props.clicked} zIndex={this.props.zIndex} />
            </>
        )
    }
}

export default MainModel
