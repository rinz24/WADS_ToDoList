import React, { useEffect } from 'react'
import { useState } from 'react'
import HeaderLogo from './components/HeaderLogo.jsx'
import ReminderItem from './components/ReminderItem.jsx'
import ContainerTitle from './components/ContainerTitle.jsx'
import DecoyFolder from './components/DecoyFolder.jsx'
import ExitButton from './components/ExitButton.jsx'
import './Dashboard.css'
import { addToDo, deleteToDo, getToDo } from './API/ToDoAPI.js'

function Dashboard() {
    const [list, setList] = useState([])
    useEffect(() => {renderItemsList()}, [])

    const renderItemsList = async () => {
        const data = await getToDo()
        if (data) setList(data)
    }

    const addItem = async (task) => {
        await addToDo(task)
        renderItemsList()
    }

    const remItem = async (id) => {
        await deleteToDo(id)
        renderItemsList()
    }
    
    return (
        <>
        <header>
            <HeaderLogo />
            <ExitButton />
        </header>
        <main>
            <section className="title">
                <h3>😂 My To-Do List 😂</h3>
            </section>
            <section>
                <ContainerTitle title="🗂️ Folders (Coming Soon)" />
                <div className="folders">
                    <DecoyFolder name="Scientific Computing" />
                    <DecoyFolder name="Human-Computer Interactions" />
                    <DecoyFolder name="Scientific Computing" />
                </div>
            </section>
            <section className='interface'>
                <div style={{width: "30%"}}>
                    <ContainerTitle title="📌 Reminder" onclick={() => {addItem("Test")}}/>
                    <div className="rem-list">
                    {list.map((item, index) => (<ReminderItem key= {index} content={item.task} onXButton={() => remItem(item._id)}/>))}
                    </div>
                </div>
                <div style={{width: "60%"}}>
                    <ContainerTitle title="📅 Schedule"/>
                    <h1 style={{textAlign: "center"}}>Content Coming Soon :)</h1>
                </div>
            </section>
        </main>
        </>
    )
}

export default Dashboard