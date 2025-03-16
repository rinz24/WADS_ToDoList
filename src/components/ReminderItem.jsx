import { useState } from 'react'
import styles from './ReminderItem.module.css'

const ReminderItem = ({ content, onXButton, onCheck, isCompleted }) => {
    return (
        <div className={styles.item}>
            <h1>-</h1>
            <input required type="checkbox" checked={isCompleted} value={content || ""} onChange={onCheck}/>
            <p>{content}</p>
            <button onClick={onXButton}>❌</button>
        </div>
    )
}

export default ReminderItem