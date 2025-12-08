import axios from 'axios';
import { Task, Priority } from '../types';

// Detecta se está em desenvolvimento (localhost) ou produção
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isDev 
  ? `http://localhost:3001` 
  : `${window.location.protocol}//${window.location.hostname}:3001`;

const API_URL = `${API_BASE}/api`;

console.log('API_URL:', API_URL);
console.log('isDev:', isDev);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get('/tasks');
    return response.data.data || [];
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

export const createTask = async (titulo: string, prioridade: Priority, descricao: string): Promise<Task> => {
  try {
    const response = await api.post('/tasks', {
      titulo,
      prioridade,
      descricao,
    });
    return response.data.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
};

export const updateTask = async (id: number, titulo: string, prioridade: Priority, descricao: string): Promise<Task> => {
  try {
    const response = await api.put(`/tasks/${id}`, {
      titulo,
      prioridade,
      descricao,
    });
    return response.data.data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};
