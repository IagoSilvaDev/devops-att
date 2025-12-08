import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import { getTasks, deleteTask } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskAdded = () => {
    loadTasks();
  };

  const handleTaskDeleted = async (id: number) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      setError('Erro ao deletar tarefa');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📝 Gerenciador de Tarefas</h1>
        <p>Organize suas atividades de forma simples e eficaz</p>
      </header>

      <main className="container">
        <div className="content">
          <TaskForm onTaskAdded={handleTaskAdded} />
          
          {error && <div className="error">{error}</div>}
          
          {loading ? (
            <div className="loading">Carregando tarefas...</div>
          ) : (
            <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
