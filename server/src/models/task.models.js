import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
            maxlength: [150, 'Title cannot exceed 150 characters']
        },
        description: {
            type: String,
            trim: true,
            default: ''
        },
        completed: {
            type: Boolean,
            default: false
        },
        category: {
            type: String,
            trim: true,
            default: 'General'
        },
        dueDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

taskSchema.index({ user: 1, completed: 1, createdAt: -1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;
