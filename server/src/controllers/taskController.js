import Task from "../models/task.models.js";

// GET /api/tasks - Get all tasks for logged-in user
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: { tasks }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch tasks"
        });
    }
};

// POST /api/tasks - Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, description, completed, dueDate, category } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });
        }

        const task = await Task.create({
            user: req.userId,
            title: title.trim(),
            description: description ? description.trim() : "",
            completed: Boolean(completed),
            dueDate: dueDate ? new Date(dueDate) : null,
            category: category || "General"
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: { task }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create task"
        });
    }
};

// PUT /api/tasks/:id - Update task with ownership check
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Ownership check requirement: verify task.user === req.userId
        if (task.user.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to modify this task"
            });
        }

        const { title, description, completed, dueDate, category } = req.body;
        if (title !== undefined) task.title = title.trim();
        if (description !== undefined) task.description = description.trim();
        if (completed !== undefined) task.completed = Boolean(completed);
        if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
        if (category !== undefined) task.category = category;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: { task }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update task"
        });
    }
};

// DELETE /api/tasks/:id - Delete task with ownership check
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Ownership check requirement: verify task.user === req.userId
        if (task.user.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this task"
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete task"
        });
    }
};
