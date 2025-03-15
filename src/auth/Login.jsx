import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signIn } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import SignInLogo from "../components/SignInLogo";
import "./AuthStyles.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {if (user) navigate("/dashboard");}, [user, loading]);
    return (
        <>
            <div className="container">
                <SignInLogo />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

                <button className="btn" onClick={() => signInWithEmailAndPassword(email, password)}> Login </button>
                <button className="btn" style={{ background: "#4285f4" }} onClick={signIn}> Login with Google </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </>
    )
}

export default Login