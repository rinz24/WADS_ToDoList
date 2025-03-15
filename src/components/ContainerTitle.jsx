import React from 'react'
import styles from './ContainerTitle.module.css'

const ContainerTitle = ({ title, onclick }) => {
    return (
        <div className={styles.conTitle}>
            <h1>{title}</h1>
            <button onClick={onclick}>+</button>
        </div>
    )
}

export default ContainerTitle