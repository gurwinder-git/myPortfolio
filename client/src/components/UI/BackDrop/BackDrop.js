import React from 'react'
import css from './BackDrop.module.css'

function BackDrop(props) {
    return (
        props.show ?
            <div className={css.backDrop} onClick={props.clicked} style={{ zIndex: (props.zIndex) - 1 }}></div > : null
    )
}

export default BackDrop
