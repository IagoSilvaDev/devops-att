CREATE TABLE IF NOT EXISTS tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    detalhes JSONB NOT NULL -- Aqui ficara a prioridade e outros metadados
);
