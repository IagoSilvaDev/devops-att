import { Task } from '../types';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onDelete }: TaskItemProps) {
  const priorityColors = {
    alta: '#ff4444',
    media: '#ffaa00',
    baixa: '#00aa44',
  };

  const priorityLabels = {
    alta: '🔴 Alta',
    media: '🟡 Média',
    baixa: '🟢 Baixa',
  };

  const criadoEm = new Date(task.detalhes.criado_em).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="task-item" style={{ borderLeftColor: priorityColors[task.detalhes.prioridade] }}>
      <div className="task-header">
        <h3>{task.titulo}</h3>
        <span className="priority-badge" style={{ backgroundColor: priorityColors[task.detalhes.prioridade] }}>
          {priorityLabels[task.detalhes.prioridade]}
        </span>
      </div>

      {task.detalhes.descricao && (
        <p className="task-description">{task.detalhes.descricao}</p>
      )}

      <div className="task-footer">
        <span className="task-date">📅 {criadoEm}</span>
        <button
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          title="Deletar tarefa"
        >
          🗑️ Concluir
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
