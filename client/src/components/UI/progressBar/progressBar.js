import React from 'react'
import css from './progressBar.module.css'

function progressBar(props) {
    return (
        <div className={css.progressContainer}>
            <div style={{ width: props.width }}></div>
        </div>
    )
}

export default progressBar
