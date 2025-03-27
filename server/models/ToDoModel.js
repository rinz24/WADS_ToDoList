import mongoose from 'mongoose';

const ToDoSchema = mongoose.Schema({
    task: {
        type: String, 
        required: true
    },

    status: {
        type: String, 
        required: true, 
        default:'ongoing', 
        enum: ['ongoing', 'completed']
    }
})

export default mongoose.model('Todolist', ToDoSchema)

