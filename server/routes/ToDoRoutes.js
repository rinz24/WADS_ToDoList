import model from '../models/ToDoModel.js'
import express from 'express'

const router = express.Router()

router.post('/add_todo', async (req, res) => {
    try {
        const { task  } = req.body

        if (!task) {
            return res.status(400).json({ message: "Please fill in the required fields." })
        }

        const newTodo = await model.create({
            task,
            status: "ongoing"
        });

        res.status(200).json({ message: "Create a to do list successfully!", newTodo })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.get('/get_todo', async (req, res) => {
    try {
        const data = await model.find();
        res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.patch('/edit_todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, status } = req.body;

        const updateData = {
            task,
            status
        }
        const updatedTodo = await model.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "To-do not found." });
        }
        res.status(200).json({ message: "To-do updated successfully!", updatedTodo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.delete('/delete_todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await model.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "To-do not found." });
        }

        res.status(200).json({ message: "To-do deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

export default router