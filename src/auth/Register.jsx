import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, register, signIn} from "../../firebase";

import SignInLogo from "../components/SignInLogo";
import styles from "./AuthStyles.module.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useNavigate();
    const reg = () => {
        if (!name) alert("Please enter name");
        register(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) history.replace("/dashboard");
    }, [user, loading]);

    return (
        <>
            <div className={styles.container}>
                <SignInLogo />
                <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
                <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                
                <button className={styles.btn} onClick={reg}> Register </button>
                <button className={styles.btn} style={{ background: "#4285f4" }} onClick={signIn}> Register with Google </button>
                <div> Already have an account? <Link to="/">Login</Link> now. </div>
            </div>
        </>
    );
}
export default Register;