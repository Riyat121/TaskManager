 
 import TaskItem from "./TaskItem";
export default function TaskList({ tasks, onDelete, onToggle, onUpdate }) {
  if (!tasks.length) {
    return (
      <div className="text-center py-10 text-slate-400">
        <p className="text-lg">📭 No tasks yet</p>
        <p className="text-sm">Start by adding something above</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}