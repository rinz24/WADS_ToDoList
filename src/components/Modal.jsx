import React from 'react'
import styles from './Modal.module.css'

const Modal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <form onSubmit={onSubmit}>
                    <button onClick={onClose} className={styles.close}>❌</button>
                    <h2>Make a Reminder!</h2>
                    <p>What is it that you need reminding?</p>
                    <input className={styles.input} placeholder="Reminder" name="rem" type="text"/>
                    <input className={styles.submit} type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Modal