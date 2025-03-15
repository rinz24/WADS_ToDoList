import React from 'react'
import styles from './SignInLogo.module.css'

const SignInLogo = () => {
    return (
        <div>
            <img src="/logo.png" className={styles.logo} alt="" />
            <h1 className={styles.name}>RinzList</h1>
        </div>
    )
}

export default SignInLogo