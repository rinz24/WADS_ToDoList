import { useState, useEffect } from 'react'
import HeaderLogo from './components/HeaderLogo.jsx'
import ReminderItem from './components/ReminderItem.jsx'
import ContainerTitle from './components/ContainerTitle.jsx'
import DecoyFolder from './components/DecoyFolder.jsx'
import ExitButton from './components/ExitButton.jsx'
import Modal from './components/Modal.jsx'
import Tracker from './components/HomeworkTracker.jsx'
import './Dashboard.css'

import { doc, addDoc, deleteDoc, updateDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

function Dashboard() {
    const [modalOpen, setOpen] = useState(false)
    const [list, setList] = useState([])
    useEffect(() => {getReminders()}, [])
    
    const getReminders = () => {
        const querySnapshot = onSnapshot(collection(db, "reminders"), (ss) =>{
            const todolist = ss.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setList(todolist)
        });

        return () => querySnapshot();
    }
    const handleSubmit = async (e) => {
        const form = e.target
        const rem = form.rem.value
        e.preventDefault()
        try {
            const docRef = await addDoc(collection(db, "reminders"), {
                task: rem,
                completed: false,
            });
            console.log("Document written with ID: ", docRef.id);
            setList([...list, {id:docRef.id, task:docRef.task, completed: docRef.false}])
        } 
        catch (e) {
            console.error("Error adding document: ", e);
        }
        setOpen(false)
    }
    const delReminder = async (id) => {
        await deleteDoc(doc(db, "reminders", id))
        setList(list.filter((item) => item.id !== (id)))
    }
    const setCompleted = async (id, completed) => {
        await updateDoc(doc(db, "reminders", id), { completed: !completed });
        setList(list.map(todo => 
            todo.id === id ? { ...todo, completed: !completed } : todo
        ));
        console.log(`Changed to ${!completed}`)
    }
    
    return (
        <>
        <header>
            <HeaderLogo />
            <ExitButton />
        </header>
        <main>
            <section className="title">
                <h3>😂 My To-do list 😂</h3>
            </section>
            <section>
                <ContainerTitle title="🗂️ Folders (Coming Soon)" />
                <div className="folders">
                    <DecoyFolder name="Scientific Computing" />
                    <DecoyFolder name="Human-Computer Interactions" />
                    <DecoyFolder name="Web Application Development and Security" />
                </div>
            </section>
            <section className='interface'>
                <div style={{width: "30%"}}>
                    <ContainerTitle title="📌 Reminder" onclick={() => setOpen(true)}/>
                    <div className="rem-list">
                    {list.map((item, i) => (<ReminderItem key={i} content={item.task || ""} onXButton={() => delReminder(item.id)} onCheck={() => setCompleted(item.id, item.completed)} isCompleted={item.completed}/>))}
                    </div>
                </div>
                <div style={{width: "65%"}}>
                    <ContainerTitle title="📅 Schedule"/>
                    <Tracker />
                </div>
            </section>

            <Modal isOpen={modalOpen} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
        </main>
        </>
    )
}

export default Dashboard