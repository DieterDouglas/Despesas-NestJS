# Expense Tracker

Aplicação full-stack de controle de despesas pessoais, com autenticação JWT, CRUD de despesas por categoria e visualização gráfica dos gastos.

**Aplicação:** https://despesas-nest-js.vercel.app
**API:** https://despesas-nestjs-production.up.railway.app

## Stack

**Backend**
- [NestJS](https://nestjs.com/) (TypeScript)
- PostgreSQL + [TypeORM](https://typeorm.io/)
- Autenticação JWT (`@nestjs/jwt`, `passport-jwt`) com senha hasheada via `bcrypt`
- Validação de payloads com `class-validator`

**Frontend**
- [React](https://react.dev/) + [Vite](https://vite.dev/) (TypeScript)
- [React Router](https://reactrouter.com/) para navegação e rotas protegidas
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [Radix UI](https://www.radix-ui.com/) para componentes acessíveis (ex: Select)
- [Recharts](https://recharts.org/) para o gráfico de despesas por categoria
- [Axios](https://axios-http.com/) como cliente HTTP

**Infra**
- Docker + Docker Compose (Postgres e backend containerizados)

## Funcionalidades

- Registro e login com autenticação JWT
- Rotas protegidas — cada usuário só acessa suas próprias despesas
- CRUD completo de despesas (criar, listar, editar, excluir)
- Categorias fixas (enum), tanto no backend quanto no frontend
- Gráfico de barras com o total gasto por categoria

## Como rodar o projeto

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) 22+ (para rodar o frontend em modo dev)

### 1. Variáveis de ambiente

Copie os arquivos de exemplo:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

### 2. Suba o backend + banco de dados

Na raiz do projeto:

```bash
docker compose up -d --build
```

Isso sobe o PostgreSQL e a API NestJS (`http://localhost:3000`).

### 3. Suba o frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Estrutura do repositório

```
.
├── backend/          # API NestJS
│   └── src/
│       ├── auth/      # Registro, login, JWT strategy/guard
│       ├── users/     # Entidade e módulo de usuários
│       └── expenses/  # Entidade, módulo e enum de categoria de despesas
├── frontend/          # SPA React
│   └── src/
│       ├── api/        # Cliente Axios
│       ├── auth/       # Contexto de autenticação e rota protegida
│       ├── components/ # Componentes reutilizáveis (Button, Input, Select, Card...)
│       ├── pages/       # Telas (Login, Register, Expenses)
│       └── types/       # Tipos e enums compartilhados
└── docker-compose.yml
```

## Principais endpoints da API

| Método | Rota              | Descrição                          | Autenticado |
|--------|-------------------|-------------------------------------|:-----------:|
| POST   | `/auth/register`  | Cria um usuário e retorna um token  |      -       |
| POST   | `/auth/login`     | Autentica e retorna um token        |      -       |
| GET    | `/expenses`       | Lista as despesas do usuário logado |      ✅      |
| POST   | `/expenses`       | Cria uma despesa                    |      ✅      |
| PATCH  | `/expenses/:id`   | Atualiza uma despesa                |      ✅      |
| DELETE | `/expenses/:id`   | Remove uma despesa                  |      ✅      |
