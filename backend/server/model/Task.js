import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task: {
     type: String,
     required: true,
     trime: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Task = mongoose.model('task', TaskSchema)
export default Task;