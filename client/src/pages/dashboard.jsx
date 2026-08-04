import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle2, 
  List, 
  Grid, 
  Archive, 
  Search, 
  BarChart3, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  CircleCheck,
  CircleDashed,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../lib/api.js";
import Navbar from "../components/layout/navbar.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Work");
  const [newPriority, setNewPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // View & Filter State
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'kanban'
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);

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
        priority: newPriority,
        completed: false,
        archived: false,
        kanbanStatus: "todo"
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

  const handleUpdateStatus = async (taskId, newStatus, isCompleted = false) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, kanbanStatus: newStatus, completed: isCompleted } : t))
    );

    try {
      await api.put(`/tasks/${taskId}`, { kanbanStatus: newStatus, completed: isCompleted });
    } catch (err) {
      console.error("Failed to update task status:", err);
      fetchTasks();
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    const nextCompleted = !currentStatus;
    const nextKanbanStatus = nextCompleted ? "completed" : "todo";

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, completed: nextCompleted, kanbanStatus: nextKanbanStatus } : t))
    );

    try {
      await api.put(`/tasks/${taskId}`, { completed: nextCompleted, kanbanStatus: nextKanbanStatus });
    } catch (err) {
      console.error("Failed to update task:", err);
      fetchTasks();
    }
  };

  const handleToggleArchive = async (taskId, currentArchived) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, archived: !currentArchived } : t))
    );

    try {
      await api.put(`/tasks/${taskId}`, { archived: !currentArchived });
    } catch (err) {
      console.error("Failed to archive task:", err);
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

  // Analytics Calculations
  const activeTasks = tasks.filter((t) => !t.archived);
  const totalCount = activeTasks.length;
  const completedCount = activeTasks.filter((t) => t.completed || t.kanbanStatus === "completed").length;
  const inProgressCount = activeTasks.filter((t) => t.kanbanStatus === "in-progress" && !t.completed).length;
  const todoCount = Math.max(0, totalCount - completedCount - inProgressCount);
  const archivedCount = tasks.filter((t) => t.archived).length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // SVG Circular Chart calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  // Filtering
  const displayedTasks = tasks.filter((task) => {
    if (showArchived) return task.archived;
    if (task.archived) return false;
    
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || task.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F6FE] text-[#1E1B4B] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 
              className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Welcome back, {user?.name || "Focus User"} 👋
            </h1>
            <p className="text-sm text-[#6B6396] mt-1">
              Here is your interactive task manager & circular analytics dashboard.
            </p>
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-[#E8E5F7] shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#7C5CFF] text-white shadow-[0_4px_12px_rgba(124,92,255,0.35)]"
                  : "text-[#6B6396] hover:text-[#1E1B4B]"
              }`}
            >
              <List size={15} />
              <span>List View</span>
            </button>

            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-[#7C5CFF] text-white shadow-[0_4px_12px_rgba(124,92,255,0.35)]"
                  : "text-[#6B6396] hover:text-[#1E1B4B]"
              }`}
            >
              <Grid size={15} />
              <span>Kanban Board</span>
            </button>
          </div>
        </div>

        {/* Top Circular Analytics & Summary Card Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Circular Chart Analytics Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E5F7] shadow-[0_8px_30px_rgba(124,92,255,0.06)] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#6B6396] uppercase tracking-wider block mb-1">
                Progress Chart
              </span>
              <h3 className="text-xl font-bold text-[#1E1B4B]" style={{ fontFamily: "'Fraunces', serif" }}>
                Task Completion
              </h3>
              <p className="text-xs text-[#6B6396] mt-1 font-medium">
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>

            {/* Circular Progress SVG */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="#F3F0FC"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="#7C5CFF"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-lg font-extrabold text-[#1E1B4B]" style={{ fontFamily: "'Fraunces', serif" }}>
                  {completionRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="lg:col-span-2 grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#E8E5F7] shadow-[0_8px_25px_rgba(124,92,255,0.05)] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#6B6396] text-xs font-semibold uppercase tracking-wider">
                <span>To Do</span>
                <CircleDashed size={16} className="text-[#6B6396]" />
              </div>
              <div className="text-3xl font-extrabold text-[#1E1B4B] my-2" style={{ fontFamily: "'Fraunces', serif" }}>
                {todoCount}
              </div>
              <div className="text-xs text-[#6B6396] font-medium">Pending start</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8E5F7] shadow-[0_8px_25px_rgba(124,92,255,0.05)] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#6B6396] text-xs font-semibold uppercase tracking-wider">
                <span>In Progress</span>
                <Clock size={16} className="text-[#6366F1]" />
              </div>
              <div className="text-3xl font-extrabold text-[#6366F1] my-2" style={{ fontFamily: "'Fraunces', serif" }}>
                {inProgressCount}
              </div>
              <div className="text-xs text-[#6B6396] font-medium">Active work</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8E5F7] shadow-[0_8px_25px_rgba(124,92,255,0.05)] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#6B6396] text-xs font-semibold uppercase tracking-wider">
                <span>Completed</span>
                <CircleCheck size={16} className="text-[#7C5CFF]" />
              </div>
              <div className="text-3xl font-extrabold text-[#7C5CFF] my-2" style={{ fontFamily: "'Fraunces', serif" }}>
                {completedCount}
              </div>
              <div className="text-xs text-[#6B6396] font-medium">Finished tasks</div>
            </div>
          </div>
        </div>

        {/* Quick Add Task Form */}
        <section className="bg-white rounded-3xl p-6 border border-[#E8E5F7] shadow-[0_8px_25px_rgba(124,92,255,0.05)] mb-8">
          <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-3 items-center">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What needs to be done today?"
              className="flex-1 w-full bg-[#F8F6FE] border border-[#E8E5F7] focus:border-[#7C5CFF] rounded-2xl px-5 py-3.5 text-[#1E1B4B] placeholder-[#6B6396]/50 outline-none transition-all text-base font-medium"
            />

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-[#F8F6FE] border border-[#E8E5F7] text-[#1E1B4B] font-semibold text-xs rounded-2xl px-4 py-3.5 outline-none cursor-pointer"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="General">General</option>
              </select>

              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="bg-[#F8F6FE] border border-[#E8E5F7] text-[#1E1B4B] font-semibold text-xs rounded-2xl px-4 py-3.5 outline-none cursor-pointer"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <button
                type="submit"
                disabled={!newTitle.trim() || isSubmitting}
                className="bg-[#7C5CFF] hover:bg-[#6366F1] text-white font-semibold px-6 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(124,92,255,0.35)] transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Plus size={18} />
                <span>Add Task</span>
              </button>
            </div>
          </form>
        </section>

        {/* Toolbar & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            <span className="text-xs text-[#6B6396] font-semibold mr-1">Filter:</span>
            {["all", "Work", "Personal", "Shopping", "Health", "General"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilterCategory(cat);
                  setShowArchived(false);
                }}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === cat && !showArchived
                    ? "bg-[#7C5CFF] text-white border-[#7C5CFF] shadow-[0_2px_8px_rgba(124,92,255,0.3)]"
                    : "bg-white text-[#6B6396] border-[#E8E5F7] hover:border-[#7C5CFF]"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}

            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                showArchived
                  ? "bg-[#1E1B4B] text-white border-[#1E1B4B]"
                  : "bg-white text-[#6B6396] border-[#E8E5F7] hover:border-[#1E1B4B]"
              }`}
            >
              <Archive size={13} />
              <span>Archived ({archivedCount})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6396]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full bg-white border border-[#E8E5F7] focus:border-[#7C5CFF] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#1E1B4B] placeholder-[#6B6396]/50 outline-none transition-all"
            />
          </div>
        </div>

        {/* Main Display Views */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-3 border-[#7C5CFF] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-[#6B6396] text-sm font-medium">Loading your tasks...</p>
          </div>
        ) : displayedTasks.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E5F7] shadow-[0_8px_30px_rgba(124,92,255,0.04)]">
            <CircleCheck size={38} className="text-[#7C5CFF] mx-auto mb-3" />
            <h3 className="text-xl font-bold text-[#1E1B4B] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
              No tasks found
            </h3>
            <p className="text-sm text-[#6B6396]">
              {showArchived ? "No archived tasks." : "Add a new task using the input form above."}
            </p>
          </div>
        ) : viewMode === "kanban" ? (
          /* Interactive 3-Column Kanban Board */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: To Do */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E5F7] shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E5F7]">
                <div className="flex items-center gap-2 font-bold text-[#1E1B4B]" style={{ fontFamily: "'Fraunces', serif" }}>
                  <CircleDashed size={16} className="text-[#6B6396]" />
                  <span>To Do</span>
                </div>
                <span className="text-xs font-semibold bg-[#F3F0FC] text-[#7C5CFF] px-2.5 py-0.5 rounded-full">
                  {displayedTasks.filter(t => !t.completed && (t.kanbanStatus === "todo" || !t.kanbanStatus)).length}
                </span>
              </div>

              <div className="space-y-3 flex-1 min-h-[150px]">
                {displayedTasks
                  .filter(t => !t.completed && (t.kanbanStatus === "todo" || !t.kanbanStatus))
                  .map(task => (
                    <motion.div
                      layout
                      key={task._id}
                      className="p-4 rounded-2xl bg-[#F8F6FE] border border-[#E8E5F7] hover:border-[#7C5CFF]/40 transition-all shadow-sm group"
                    >
                      <div className="font-semibold text-sm text-[#1E1B4B] mb-2">{task.title}</div>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8E5F7]/60">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-[#7C5CFF] border border-[#E8E5F7]">
                          {task.category || "General"}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdateStatus(task._id, "in-progress", false)}
                            className="text-xs font-semibold bg-white border border-[#E8E5F7] hover:border-[#7C5CFF] text-[#7C5CFF] px-2 py-1 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                            title="Move to In Progress"
                          >
                            <span>Progress</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E5F7] shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E5F7]">
                <div className="flex items-center gap-2 font-bold text-[#1E1B4B]" style={{ fontFamily: "'Fraunces', serif" }}>
                  <Clock size={16} className="text-[#6366F1]" />
                  <span>In Progress</span>
                </div>
                <span className="text-xs font-semibold bg-[#F3F0FC] text-[#6366F1] px-2.5 py-0.5 rounded-full">
                  {displayedTasks.filter(t => !t.completed && t.kanbanStatus === "in-progress").length}
                </span>
              </div>

              <div className="space-y-3 flex-1 min-h-[150px]">
                {displayedTasks
                  .filter(t => !t.completed && t.kanbanStatus === "in-progress")
                  .map(task => (
                    <motion.div
                      layout
                      key={task._id}
                      className="p-4 rounded-2xl bg-[#F3F0FC]/60 border border-[#E8E5F7] hover:border-[#6366F1]/40 transition-all shadow-sm group"
                    >
                      <div className="font-semibold text-sm text-[#1E1B4B] mb-2">{task.title}</div>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8E5F7]/60">
                        <button
                          onClick={() => handleUpdateStatus(task._id, "todo", false)}
                          className="text-xs font-semibold bg-white border border-[#E8E5F7] text-[#6B6396] hover:text-[#1E1B4B] px-2 py-1 rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft size={12} />
                          <span>To Do</span>
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(task._id, "completed", true)}
                          className="text-xs font-semibold bg-[#7C5CFF] text-white px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer shadow-[0_2px_8px_rgba(124,92,255,0.3)]"
                        >
                          <span>Done</span>
                          <Check size={12} strokeWidth={3} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Column 3: Completed */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E5F7] shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E5F7]">
                <div className="flex items-center gap-2 font-bold text-[#1E1B4B]" style={{ fontFamily: "'Fraunces', serif" }}>
                  <CircleCheck size={16} className="text-[#7C5CFF]" />
                  <span>Completed</span>
                </div>
                <span className="text-xs font-semibold bg-[#F3F0FC] text-[#7C5CFF] px-2.5 py-0.5 rounded-full">
                  {displayedTasks.filter(t => t.completed || t.kanbanStatus === "completed").length}
                </span>
              </div>

              <div className="space-y-3 flex-1 min-h-[150px]">
                {displayedTasks
                  .filter(t => t.completed || t.kanbanStatus === "completed")
                  .map(task => (
                    <motion.div
                      layout
                      key={task._id}
                      className="p-4 rounded-2xl bg-white border border-[#E8E5F7] opacity-80"
                    >
                      <div className="font-semibold text-sm line-through text-[#6B6396] mb-2">{task.title}</div>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8E5F7]/60">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F3F0FC] text-[#7C5CFF]">
                          Done
                        </span>

                        <button
                          onClick={() => handleUpdateStatus(task._id, "in-progress", false)}
                          className="text-xs font-semibold bg-[#F3F0FC] text-[#7C5CFF] px-2 py-1 rounded-xl cursor-pointer"
                        >
                          Undo
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          /* Animated List View */
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {displayedTasks.map((task) => (
                <motion.div
                  key={task._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className={`bg-white rounded-2xl p-4 md:p-5 border transition-all flex items-center gap-4 group ${
                    task.completed
                      ? "border-[#E8E5F7] bg-white/70 opacity-70"
                      : "border-[#E8E5F7] shadow-[0_4px_15px_rgba(124,92,255,0.04)]"
                  }`}
                >
                  <button
                    onClick={() => handleToggleComplete(task._id, task.completed)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                      task.completed
                        ? "bg-[#7C5CFF] border-[#7C5CFF] text-white"
                        : "border-[#1E1B4B]/30 hover:border-[#7C5CFF]"
                    }`}
                  >
                    {task.completed && <Check size={14} strokeWidth={3} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <span className={`block text-base ${task.completed ? "line-through text-[#6B6396]" : "text-[#1E1B4B] font-semibold"}`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F3F0FC] text-[#7C5CFF] border border-[#E8E5F7]">
                        {task.category || "General"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleArchive(task._id, task.archived)}
                    className="text-[#6B6396] hover:text-[#1E1B4B] p-2 rounded-xl hover:bg-[#F3F0FC] transition-all cursor-pointer"
                    title={task.archived ? "Unarchive task" : "Archive task"}
                  >
                    <Archive size={16} />
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="opacity-0 group-hover:opacity-100 text-[#6B6396] hover:text-[#FF4D4D] p-2 rounded-xl hover:bg-[#FFF5F7] transition-all cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 size={16} />
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
