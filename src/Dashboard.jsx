import React from 'react'
import { useState } from 'react'
import HeaderLogo from './components/HeaderLogo.jsx'
import ReminderItem from './components/ReminderItem.jsx'
import ContainerTitle from './components/ContainerTitle.jsx'
import DecoyFolder from './components/DecoyFolder.jsx'
import ExitButton from './components/ExitButton.jsx'
import './Dashboard.css'

function Dashboard() {
    const [currID, setCurrent] = useState(4)
    const [list, setList] = useState([
        {id: 1, content: "Wash the dishes"},
        {id: 2, content: "Sweep the floors"},
        {id: 3, content: "Do homeworks"}
    ])

    const addRem = (content) => {
        const item = {id: currID, content: content}
        setList(list.concat(item))
        console.log(list)
        setCurrent(currID + 1)
    }

    const removeRem = (id) => {
        setList(list.filter((item) => item.id !== (id)))
        console.log(list)
    }
    
    return (
        <>
        <header>
            <HeaderLogo />
            <ExitButton />
        </header>
        <main>
            <section className="title">
                <h3>😂 SEMESTER 4 SUCKS SO MUCH ASS!!! 😂</h3>
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
                    <ContainerTitle title="📌 Reminder" onclick={() => {addRem("test")}}/>
                    <div className="rem-list">
                    {list.map((item, index) => (<ReminderItem key= {index} content={item.content} onXButton={() => removeRem(index)}/>))}
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