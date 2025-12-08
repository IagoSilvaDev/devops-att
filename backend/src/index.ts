import express, { Express, Request, Response, NextFunction } from 'express';
import { Pool, QueryResult } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());

// Configuração do Pool de Conexões
const pool = new Pool({
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'tododb',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Tipos
interface Task {
  id: number;
  titulo: string;
  detalhes: {
    prioridade: 'alta' | 'media' | 'baixa';
    descricao: string;
    criado_em: string;
  };
}

interface CreateTaskRequest {
  titulo: string;
  prioridade: 'alta' | 'media' | 'baixa';
  descricao: string;
}

// Validações
const validateTask = (task: any): string | null => {
  if (!task.titulo || typeof task.titulo !== 'string' || task.titulo.trim().length === 0) {
    return 'Título é obrigatório e deve ser uma string';
  }
  if (task.titulo.length > 255) {
    return 'Título não pode exceder 255 caracteres';
  }
  if (!['alta', 'media', 'baixa'].includes(task.prioridade)) {
    return 'Prioridade inválida. Use: alta, media ou baixa';
  }
  if (typeof task.descricao !== 'string') {
    return 'Descrição deve ser uma string';
  }
  return null;
};

// Error Handler Middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro no servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Rotas

// GET /api/tasks - Listar todas as tarefas
app.get('/api/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: QueryResult<Task> = await pool.query(
      'SELECT * FROM tarefas ORDER BY id DESC'
    );
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks - Criar nova tarefa
app.post('/api/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titulo, prioridade, descricao } = req.body as CreateTaskRequest;

    // Validação
    const validationError = validateTask({ titulo, prioridade, descricao });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const detalhes = {
      prioridade,
      descricao: descricao.trim(),
      criado_em: new Date().toISOString()
    };

    const result: QueryResult<Task> = await pool.query(
      'INSERT INTO tarefas (titulo, detalhes) VALUES ($1, $2) RETURNING *',
      [titulo.trim(), detalhes]
    );

    res.status(201).json({
      success: true,
      message: 'Tarefa criada com sucesso',
      data: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id - Atualizar tarefa
app.put('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { titulo, prioridade, descricao } = req.body as CreateTaskRequest;

    // Validação
    const validationError = validateTask({ titulo, prioridade, descricao });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const detalhes = {
      prioridade,
      descricao: descricao.trim(),
      criado_em: new Date().toISOString()
    };

    const result: QueryResult<Task> = await pool.query(
      'UPDATE tarefas SET titulo = $1, detalhes = $2 WHERE id = $3 RETURNING *',
      [titulo.trim(), detalhes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({
      success: true,
      message: 'Tarefa atualizada com sucesso',
      data: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id - Deletar tarefa
app.delete('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tarefas WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({
      success: true,
      message: 'Tarefa deletada com sucesso',
      data: { id: result.rows[0].id }
    });
  } catch (err) {
    next(err);
  }
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Servidor rodando na porta ${PORT}`);
  console.log(`✓ Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Banco de dados: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});
