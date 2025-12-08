const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do Banco (nomes definidos no docker-compose)
const pool = new Pool({
  user: 'user',
  host: 'db', // Nome do serviço no docker-compose
  database: 'tododb',
  password: 'password',
  port: 5432,
});

// LISTAR (READ)
app.get('/tarefas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tarefas ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

// CRIAR (CREATE)
app.post('/tarefas', async (req, res) => {
  // 1. Recebemos a 'descricao' do corpo da requisição
  const { titulo, prioridade, descricao } = req.body;
  
  // 2. Adicionamos a 'descricao' dentro do objeto que será salvo na coluna JSON
  const jsonMetadata = { 
      prioridade: prioridade, 
      descricao: descricao, // <--- Nova chave aqui
      criado_em: new Date() 
  };

  try {
    const result = await pool.query(
      'INSERT INTO tarefas (titulo, detalhes) VALUES ($1, $2) RETURNING *',
      [titulo, jsonMetadata]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar');
  }
});

// DELETAR (DELETE)
app.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tarefas WHERE id = $1', [id]);
        res.json({ message: "Deletado com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar');
    }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});