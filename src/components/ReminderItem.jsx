import React from 'react'
import styles from './ReminderItem.module.css'

const ReminderItem = ({ content, onXButton }) => {
    return (
        <div className={styles.item}>
            <h1>-</h1>
            <input type="checkbox" />
            <p>{content}</p>
            <button onClick={onXButton}>❌</button>
        </div>
    )
}

export default ReminderItem