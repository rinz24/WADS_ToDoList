import React from 'react'
import styles from './ExitButton.module.css'
import { auth, signOut } from '../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

const ExitButton = () => {
    const nav = useNavigate()
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out");
                nav("/")
            })
            .catch((error) => {
                console.error("Error signing out:", error);
        });
    };

    return (
        <button className={styles.exit} onClick={handleLogout}>
            <FontAwesomeIcon icon={faDoorOpen} />
            <h3>Log Out</h3>
        </button>
    )
}

export default ExitButton