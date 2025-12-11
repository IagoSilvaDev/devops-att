import { useState } from 'react';
import { createTask } from '../services/api';
import { Priority } from '../types';
import './TaskForm.css';

interface TaskFormProps {
  onTaskAdded: () => void;
}

function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState<Priority>('media');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!titulo.trim()) {
      setError('Título é obrigatório');
      return;
    }

    try {
      setLoading(true);
      await createTask(titulo, prioridade, descricao);
      setTitulo('');
      setDescricao('');
      setPrioridade('media');
      onTaskAdded();
    } catch (err) {
      setError('Erro ao criar tarefa');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Adicionar Nova Tarefaaaaaaaaaaaaaa</h2>
      
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="titulo">Título *</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título da tarefa"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="prioridade">Prioridade</label>
        <select
          id="prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value as Priority)}
          disabled={loading}
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição da tarefa (opcional)"
          rows={3}
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Criando...' : 'Adicionar Tarefa'}
      </button>
    </form>
  );
}

export default TaskForm;
