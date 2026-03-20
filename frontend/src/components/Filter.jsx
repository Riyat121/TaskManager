function Filter({ active, onChange }) {
  const buttons = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'pending', label: 'Pending' },
  ];

  return (
    <div className="flex gap-80 mb-4">
      {buttons.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3 py-1.5 rounded-md border ${active === key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Filter;