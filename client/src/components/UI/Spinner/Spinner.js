import React from 'react'
import css from './Spinner.module.css'

function Spinner() {


    return (
        <div className={css.spinnerBackgraund}>
            <div className={css.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner
