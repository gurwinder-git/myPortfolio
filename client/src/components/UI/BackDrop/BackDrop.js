import React from 'react'
import css from './BackDrop.module.css'

function BackDrop(props) {
    return (
        props.show ?
            <div className={css.backDrop} onClick={props.clicked}></div> : null
    )
}

export default BackDrop
