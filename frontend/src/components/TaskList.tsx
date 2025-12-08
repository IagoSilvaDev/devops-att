import { Task } from '../types';
import TaskItem from './TaskItem';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onTaskDeleted: (id: number) => void;
}

function TaskList({ tasks, onTaskDeleted }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>✨ Nenhuma tarefa adicionada ainda</p>
        <p>Comece adicionando uma tarefa no formulário acima!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Suas Tarefas ({tasks.length})</h2>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onTaskDeleted} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
