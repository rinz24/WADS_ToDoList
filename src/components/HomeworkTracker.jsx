import React, { useState } from "react";
import styles from './HomeworkTracker.module.css';

const Tracker = () => {
    const [homework, setHomework] = useState([
        { task: "Example Homework", date: "2025-03-14", deadline: "2025-03-20", checked: false }
    ]);

    // Add Homework Row
    const addRow = () => {
        setHomework([...homework, { task: "", date: "", deadline: "", checked: false }]);
    };

    // Automatic Countdown Calculation
    const calculateCountdown = (deadline) => {
        if (!deadline) return "";
        const now = new Date();
        const dueDate = new Date(deadline);
        const diff = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
        return diff >= 0 ? `${diff} days` : "Overdue";
    };

    return (
        <div className="homework-section">
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Homework</th>
                    <th>Date</th>
                    <th>Deadline</th>
                    <th>Countdown</th>
                    <th>✔</th>
                </tr>
                </thead>
                <tbody>
                {homework.map((row, index) => (
                    <tr key={index}>
                    <td><input type="text" value={row.task} onChange={(e) => {
                        let newHomework = [...homework];
                        newHomework[index].task = e.target.value;
                        setHomework(newHomework);
                    }} /></td>
                    <td><input type="date" value={row.date} onChange={(e) => {
                        let newHomework = [...homework];
                        newHomework[index].date = e.target.value;
                        setHomework(newHomework);
                    }} /></td>
                    <td><input type="date" value={row.deadline} onChange={(e) => {
                        let newHomework = [...homework];
                        newHomework[index].deadline = e.target.value;
                        setHomework(newHomework);
                    }} /></td>
                    <td>{calculateCountdown(row.deadline)}</td>
                    <td><input type="checkbox" checked={row.checked} onChange={() => {
                        let newHomework = [...homework];
                        newHomework[index].checked = !newHomework[index].checked;
                        setHomework(newHomework);
                    }} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className={styles.addBtn}onClick={addRow}>➕ Add Row</button>
        </div>
    );
};

export default Tracker;