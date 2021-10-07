import React from 'react'
import css from './ProjectCard.module.css'
import image from './image.png'
function ProjectCard() {
    return (
        <div className={css.projectCard}>
            <a href="/" target="_blank">
                <div className={css.imageDiv} style={{ backgroundImage: `url(${image})` }}>
                </div>
            </a>
            <div className={css.updateDeleteDiv}>
                <h3>Title</h3>
                <div>
                    <button className={css.updateBtn}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className={css.deleteBtn}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            <div className={css.descriptionDiv}>
                <p > this is project description this is project description this is project description this is project description this is project description this is   </p>
            </div>
        </div>
    )
}

export default ProjectCard
