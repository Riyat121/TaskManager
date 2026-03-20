import { useEffect, useMemo, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Filter from './components/Filter';

const STORAGE_KEY = 'taskManagerTasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTasks(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    setTasks((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text: cleanText, completed: false },
    ]);
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((task) => task.id !== id));
  const toggleTask = (id) => setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  const updateTask = (id, text) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, text: cleanText } : task)));
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    if (filter === 'pending') return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
   
  <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4">
    
    
    <div className="w-full h-full max-w-4xl bg-blue-300 backdrop-blur-lg shadow-xl rounded-3xl p-6 border border-slate-200">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-semibold text-slate-800 tracking-tight">
          Task Manager 
        </h1>
        <p className="text-sm text-slate-900 mt-1">
          Organize your day, stay productive
        </p>
      </div>

      {/* Input */}
      <TaskInput onAdd={addTask} />

      {/* Filter + Stats */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <Filter active={filter} onChange={setFilter} />

        {/* Stats */}
        <div className="text-sm text-slate-500">
          {tasks.filter(t => t.completed).length} / {tasks.length} completed
        </div>
      </div>

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onUpdate={updateTask}
      />

      {/* Footer */}
      {tasks.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setTasks([])}
            className="text-xs text-rose-500 hover:text-rose-700 transition"
          >
            Clear all tasks
          </button>
        </div>
      )}
    </div>
  </div>
)
  
}

export default App;