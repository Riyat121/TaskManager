 import { useState } from 'react';
 
 export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('');

  const add = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <div className="flex gap-2 mb-5">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && add()}
        placeholder=" Add a new task..."
        className="flex-1 border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
    />
      <button
        onClick={add}
        className="px-5 py-2 bg-fuchsia-600 text-white rounded-xl hover:bg-fuchsia-700 active:scale-95 transition"
      >
        Add
        
      </button>
    </div>
  );
}

