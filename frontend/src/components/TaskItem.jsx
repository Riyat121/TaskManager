import { useState, useEffect, useRef } from 'react';
export default function TaskItem({ task, onDelete, onToggle, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(task.text);
    } else {
      onUpdate(task.id, trimmed);
    }
    setEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition border border-slate-100">
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-indigo-600"
        />

        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') {
                setDraft(task.text);
                setEditing(false);
              }
            }}
            className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <span
            className={`text-sm ${
              task.completed
                ? 'line-through text-slate-70'
                : 'text-slate-800'
            }`}
          >
            {task.text}
          </span>
        )}
      </label>

      <div className="flex items-center gap-3 ml-3">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-indigo-500 hover:text-indigo-700"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-rose-500 hover:text-rose-700"
        >
          🗑
        </button>
      </div>
    </li>
  );
}