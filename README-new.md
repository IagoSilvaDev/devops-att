# Task Manager - Gerenciador de Tarefas

Aplicação moderna de gerenciamento de tarefas construída com React + TypeScript no frontend e Express + TypeScript no backend, tudo containerizado com Docker.

## 🚀 Características

- ✅ **API RESTful** com Express.js e TypeScript
- ✅ **Interface web** moderna com React e TypeScript
- ✅ **Banco de dados** PostgreSQL com volumes persistentes
- ✅ **Validação** de entrada em ambos frontend e backend
- ✅ **Docker Compose** para orquestração de containers
- ✅ **Health checks** implementados
- ✅ **Tratamento de erros** robusto
- ✅ **Responsivo** e funciona em qualquer dispositivo

## 📋 Endpoints da API

### GET /api/tasks
Retorna lista de todas as tarefas.

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "titulo": "Tarefa 1",
      "detalhes": {
        "prioridade": "alta",
        "descricao": "Descrição",
        "criado_em": "2024-12-08T15:30:00.000Z"
      }
    }
  ],
  "count": 1
}
```

### POST /api/tasks
Cria uma nova tarefa.

**Request:**
```json
{
  "titulo": "Nova tarefa",
  "prioridade": "media",
  "descricao": "Descrição da tarefa"
}
```

### PUT /api/tasks/:id
Atualiza uma tarefa existente.

### DELETE /api/tasks/:id
Deleta uma tarefa.

### GET /health
Health check do servidor.

## 🏗️ Estrutura do Projeto

```
devops-att/
├── backend/
│   ├── src/
│   │   └── index.ts
│   ├── dist/
│   ├── dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── styles
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── dist/
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── index.html
│   └── nginx.conf
├── database/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

## 🐳 Como usar

### Pré-requisitos
- Docker
- Docker Compose

### Desenvolvimento Local

1. Clone o repositório:
```bash
git clone <seu-repo>
cd devops-att
```

2. Instale dependências do backend:
```bash
cd backend
npm install
cd ..
```

3. Instale dependências do frontend:
```bash
cd frontend
npm install
cd ..
```

4. Inicie os containers:
```bash
docker-compose up -d --build
```

5. Acesse a aplicação:
- **Frontend:** http://localhost
- **Backend API:** http://localhost:3001/api/tasks
- **Health Check:** http://localhost:3001/health

### Produção (AWS/Ubuntu)

1. Clone o repositório na instância Ubuntu:
```bash
git clone <seu-repo>
cd devops-att
```

2. Inicie os containers:
```bash
docker-compose up -d --build
```

3. Acesse pelo IP público da instância:
```
http://<SEU_IP_PUBLICO>
```

## 📊 Banco de Dados

### Tabela: tarefas
```sql
CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    detalhes JSONB NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Variáveis de Ambiente

### Backend (.env)
```env
NODE_ENV=production
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=tododb
```

## 🛠️ Desenvolvimento

### Backend

Compilar TypeScript:
```bash
cd backend
npm run build
```

Executar em desenvolvimento:
```bash
npm run dev
```

### Frontend

Build para produção:
```bash
cd frontend
npm run build
```

Executar em desenvolvimento:
```bash
npm run dev
```

## 📝 Licença

MIT
