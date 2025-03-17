import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";

import SignInLogo from "../components/SignInLogo";
import styles from "./AuthStyles.module.css";

function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <>
            <div className={styles.container}>
                <SignInLogo />
                <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
                <button className={styles.btn} onClick={() => sendPasswordReset(email)}> Send password reset email </button>
                <div> Don't have an account? <Link to="/register">Register</Link> now. </div>
            </div>
        </>
    );
}
export default Reset;