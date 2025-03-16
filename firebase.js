// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, where, doc, addDoc, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey              : import.meta.env.VITE_API_KEY,
    authDomain          : import.meta.env.VITE_AUTH_DOMAIN,
    projectId           : import.meta.env.VITE_PROJECT_ID,
    storageBucket       : import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId   : import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId               : import.meta.env.VITE_APP_ID,
    measurementId       : import.meta.env.VITE_MEASUREMENT_ID
};

const googleProvider = new GoogleAuthProvider()
const app   = initializeApp(firebaseConfig);
const auth  = getAuth(app)
const db    = getFirestore(app);

const signIn = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid             : user.uid,
                name            : user.displayName,
                authProvider    : "google",
                email           : user.email,
            });
        }
    } 
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } 
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const register = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } 
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const getReminders = async () => {
    try{
        const querySnapshot = await getDocs(collection(db, "reminders"));
        const list = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(list)
        return list
    }
    catch (err){
        console.error(err)
        return [];
    }
};

const finishTask = async (docId) => {
    const docRef = doc(db, "reminders", docId);
    await updateDoc(docRef, {completed: true});
    console.log("Task Finishedd!");
};

export { auth, signInWithEmailAndPassword, signIn, signOut, logIn, register, sendPasswordReset }
export { db }
