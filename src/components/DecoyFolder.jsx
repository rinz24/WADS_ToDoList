import React from 'react'
import styles from './DecoyFolder.module.css'

const DecoyFolder = ({ name }) => {
    return (
        <button className={styles.decfol}>
            <p><span>📁</span> {name}</p>
        </button>
    )
}

export default DecoyFolder