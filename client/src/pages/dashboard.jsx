import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, LogOut, Calendar, Tag, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../lib/api.js";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Work");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  // Fetch user tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      if (res.data?.success && res.data?.data?.tasks) {
        setTasks(res.data.data.tasks);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const titleToAdd = newTitle.trim();
    setNewTitle("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/tasks", {
        title: titleToAdd,
        category: newCategory,
        completed: false
      });

      if (res.data?.success && res.data?.data?.task) {
        setTasks((prev) => [res.data.data.task, ...prev]);
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle completion status
  const handleToggleComplete = async (taskId, currentStatus) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, completed: !currentStatus } : t))
    );

    try {
      await api.put(`/tasks/${taskId}`, { completed: !currentStatus });
    } catch (err) {
      console.error("Failed to update task:", err);
      // Revert if API fails
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, completed: currentStatus } : t))
      );
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    // Optimistic delete
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== taskId));

    try {
      await api.delete(`/tasks/${taskId}`);
    } catch (err) {
      console.error("Failed to delete task:", err);
      setTasks(previousTasks);
    }
  };

  // Metrics
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1B1A] font-sans flex flex-col">
      {/* Header */}
      <header className="bg-[#2D3B36] text-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 
              className="text-2xl md:text-3xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              TaskFlow
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E8603C] text-white flex items-center justify-center font-semibold text-sm shadow-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-white/90">
                {user?.name || "User"}
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-8 pt-8 pb-20">
        {/* Today's Focus & Animated Progress Bar */}
        <section className="mb-10 bg-white p-6 md:p-8 rounded-2xl border border-[#E5DFD6] shadow-[0_4px_20px_rgba(45,59,54,0.03)]">
          <div className="flex justify-between items-baseline mb-3">
            <h2 
              className="text-xl md:text-2xl font-semibold text-[#2D3B36]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Today's Focus
            </h2>
            <div className="text-sm font-medium text-[#6B6560]">
              <span className="text-[#2D3B36] font-bold text-base">{completedCount}</span> of{" "}
              <span>{totalCount}</span> tasks done
            </div>
          </div>

          {/* Progress Bar Fill */}
          <div className="h-2 w-full bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E5DFD6]">
            <motion.div
              className="h-full bg-[#7A9B76] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </section>

        {/* Add Task Input Form */}
        <section className="mb-8">
          <form onSubmit={handleAddTask} className="relative flex items-center">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What needs to be done today?"
              className="w-full bg-white border border-[#E5DFD6] focus:border-[#E8603C] rounded-2xl px-5 py-4 pr-16 text-[#1C1B1A] placeholder-[#6B6560]/50 shadow-[0_4px_20px_rgba(45,59,54,0.03)] outline-none transition-all text-base md:text-lg"
            />

            <button
              type="submit"
              disabled={!newTitle.trim() || isSubmitting}
              className="absolute right-3 bg-[#E8603C] hover:bg-[#d05230] text-white p-2.5 rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-[#E8603C] cursor-pointer"
              title="Add Task"
            >
              <Plus size={20} />
            </button>
          </form>

          {/* Category Selector */}
          <div className="flex items-center gap-2 mt-3 px-1">
            <span className="text-xs text-[#6B6560] font-medium mr-1">Category:</span>
            {["Work", "Personal", "Urgent", "General"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setNewCategory(cat)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                  newCategory === cat
                    ? "bg-[#2D3B36] text-white border-[#2D3B36]"
                    : "bg-white text-[#6B6560] border-[#E5DFD6] hover:border-[#2D3B36]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Task Filter Tabs */}
        {totalCount > 0 && (
          <div className="flex items-center justify-between border-b border-[#E5DFD6] pb-3 mb-6">
            <div className="flex items-center gap-4 text-sm font-medium">
              <button
                onClick={() => setFilter("all")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  filter === "all"
                    ? "border-[#E8603C] text-[#2D3B36]"
                    : "border-transparent text-[#6B6560] hover:text-[#2D3B36]"
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  filter === "active"
                    ? "border-[#E8603C] text-[#2D3B36]"
                    : "border-transparent text-[#6B6560] hover:text-[#2D3B36]"
                }`}
              >
                Active ({totalCount - completedCount})
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  filter === "completed"
                    ? "border-[#E8603C] text-[#2D3B36]"
                    : "border-transparent text-[#6B6560] hover:text-[#2D3B36]"
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>
        )}

        {/* Task List / Loading State / Empty State */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block w-8 h-8 border-3 border-[#2D3B36] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-[#6B6560] text-sm">Fetching your tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-12 text-center border border-[#E5DFD6] shadow-sm my-4"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FAF7F2] text-[#7A9B76] flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 
              className="text-xl font-semibold text-[#2D3B36] mb-2"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                ? "No active tasks right now"
                : "Your task list is clear"}
            </h3>
            <p className="text-[#6B6560] text-sm max-w-sm mx-auto">
              {filter === "all"
                ? "Add a new task above to begin organizing your day with clarity."
                : "Items will appear here once you add or complete tasks."}
            </p>
          </motion.div>
        ) : (
          /* Animated Task List */
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task._id}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0, padding: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`bg-white rounded-xl p-4 md:p-5 border transition-all flex items-center gap-4 group ${
                    task.completed
                      ? "border-[#E5DFD6]/60 bg-white/70 opacity-75"
                      : "border-[#E5DFD6] hover:border-[#2D3B36]/30 shadow-[0_2px_12px_rgba(45,59,54,0.03)]"
                  }`}
                >
                  {/* Motion Checkbox Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(task._id, task.completed)}
                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0 ${
                      task.completed
                        ? "bg-[#7A9B76] border-[#7A9B76] text-white"
                        : "border-[#2D3B36]/40 hover:border-[#7A9B76] bg-transparent"
                    }`}
                    aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
                  >
                    <motion.div
                      initial={false}
                      animate={{ scale: task.completed ? 1 : 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.div>
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block text-base transition-all duration-200 truncate ${
                        task.completed
                          ? "line-through text-[#6B6560]"
                          : "text-[#1C1B1A] font-medium"
                      }`}
                    >
                      {task.title}
                    </span>

                    {task.category && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#6B6560] border border-[#E5DFD6]">
                          {task.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task._id)}
                    className="opacity-0 group-hover:opacity-100 text-[#6B6560] hover:text-[#E8603C] p-2 rounded-lg hover:bg-[#FFF5F2] transition-all cursor-pointer flex-shrink-0"
                    title="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
