import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, LogOut, CheckCircle2, Sparkles, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../lib/api.js";
import Navbar from "../components/layout/navbar.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Work");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState("all");

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

  const handleToggleComplete = async (taskId, currentStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, completed: !currentStatus } : t))
    );

    try {
      await api.put(`/tasks/${taskId}`, { completed: !currentStatus });
    } catch (err) {
      console.error("Failed to update task:", err);
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, completed: currentStatus } : t))
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== taskId));

    try {
      await api.delete(`/tasks/${taskId}`);
    } catch (err) {
      console.error("Failed to delete task:", err);
      setTasks(previousTasks);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F6FE] text-[#1E1B4B] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Today's Focus Progress Section */}
        <section className="mb-8 bg-white p-6 md:p-8 rounded-3xl border border-[#E8E5F7] shadow-[0_8px_30px_rgba(124,92,255,0.06)]">
          <div className="flex justify-between items-baseline mb-4">
            <div>
              <h2 
                className="text-2xl md:text-3xl font-extrabold text-[#1E1B4B]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Today's Focus
              </h2>
              <p className="text-xs text-[#6B6396] mt-0.5">Track your daily task completion rate</p>
            </div>
            <div className="text-sm font-semibold text-[#6B6396]">
              <span className="text-[#7C5CFF] font-bold text-lg">{completedCount}</span> of{" "}
              <span>{totalCount}</span> tasks done
            </div>
          </div>

          {/* Lavender Animated Progress Bar */}
          <div className="h-3 w-full bg-[#F3F0FC] rounded-full overflow-hidden border border-[#E8E5F7] p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#6366F1] rounded-full shadow-[0_2px_10px_rgba(124,92,255,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </section>

        {/* Quick Add Task Input Form */}
        <section className="mb-8">
          <form onSubmit={handleAddTask} className="relative flex items-center">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What needs to be done today?"
              className="w-full bg-white border border-[#E8E5F7] focus:border-[#7C5CFF] rounded-2xl px-5 py-4 pr-16 text-[#1E1B4B] placeholder-[#6B6396]/50 shadow-[0_4px_20px_rgba(124,92,255,0.04)] outline-none transition-all text-base md:text-lg font-medium"
            />

            <button
              type="submit"
              disabled={!newTitle.trim() || isSubmitting}
              className="absolute right-3 bg-[#7C5CFF] hover:bg-[#6366F1] text-white p-2.5 rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-[0_4px_12px_rgba(124,92,255,0.3)]"
              title="Add Task"
            >
              <Plus size={20} />
            </button>
          </form>

          {/* Category Selector */}
          <div className="flex items-center gap-2 mt-3 px-1">
            <span className="text-xs text-[#6B6396] font-semibold mr-1">Category:</span>
            {["Work", "Personal", "Urgent", "General"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setNewCategory(cat)}
                className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer font-medium ${
                  newCategory === cat
                    ? "bg-[#7C5CFF] text-white border-[#7C5CFF] shadow-[0_2px_8px_rgba(124,92,255,0.3)]"
                    : "bg-white text-[#6B6396] border-[#E8E5F7] hover:border-[#7C5CFF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Task Filter Tabs */}
        {totalCount > 0 && (
          <div className="flex items-center justify-between border-b border-[#E8E5F7] pb-3 mb-6">
            <div className="flex items-center gap-6 text-sm font-semibold">
              <button
                onClick={() => setFilter("all")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  filter === "all"
                    ? "border-[#7C5CFF] text-[#7C5CFF]"
                    : "border-transparent text-[#6B6396] hover:text-[#1E1B4B]"
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  filter === "active"
                    ? "border-[#7C5CFF] text-[#7C5CFF]"
                    : "border-transparent text-[#6B6396] hover:text-[#1E1B4B]"
                }`}
              >
                Active ({totalCount - completedCount})
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  filter === "completed"
                    ? "border-[#7C5CFF] text-[#7C5CFF]"
                    : "border-transparent text-[#6B6396] hover:text-[#1E1B4B]"
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
            <div className="inline-block w-8 h-8 border-3 border-[#7C5CFF] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-[#6B6396] text-sm font-medium">Fetching your tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-12 text-center border border-[#E8E5F7] shadow-[0_8px_30px_rgba(124,92,255,0.04)] my-4"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#F3F0FC] text-[#7C5CFF] flex items-center justify-center border border-[#E8E5F7]">
              <CheckCircle2 size={32} />
            </div>
            <h3 
              className="text-xl font-bold text-[#1E1B4B] mb-2"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                ? "No active tasks right now"
                : "Your task list is clear"}
            </h3>
            <p className="text-[#6B6396] text-sm max-w-sm mx-auto">
              {filter === "all"
                ? "Add a new task above to begin organizing your day with calm clarity."
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
                  className={`bg-white rounded-2xl p-4 md:p-5 border transition-all flex items-center gap-4 group ${
                    task.completed
                      ? "border-[#E8E5F7]/60 bg-white/70 opacity-70"
                      : "border-[#E8E5F7] hover:border-[#7C5CFF]/40 shadow-[0_4px_15px_rgba(124,92,255,0.04)]"
                  }`}
                >
                  {/* Lavender Motion Checkbox Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(task._id, task.completed)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0 ${
                      task.completed
                        ? "bg-[#7C5CFF] border-[#7C5CFF] text-white shadow-[0_2px_8px_rgba(124,92,255,0.4)]"
                        : "border-[#1E1B4B]/30 hover:border-[#7C5CFF] bg-transparent"
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
                          ? "line-through text-[#6B6396]"
                          : "text-[#1E1B4B] font-semibold"
                      }`}
                    >
                      {task.title}
                    </span>

                    {task.category && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F3F0FC] text-[#7C5CFF] border border-[#E8E5F7]">
                          {task.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task._id)}
                    className="opacity-0 group-hover:opacity-100 text-[#6B6396] hover:text-[#FF4D4D] p-2 rounded-xl hover:bg-[#FFF5F7] transition-all cursor-pointer flex-shrink-0"
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
