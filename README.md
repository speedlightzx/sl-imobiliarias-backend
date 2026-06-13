# 🖥️ Backend em Nest.js - SI

## 🔧 Tecnologias usadas no projeto:
- Node.js
- Docker e Docker Compose
- Nest.js
- ORM: Drizzle ORM
- Validator: Class-validator
- Websocket: Socket.io
- Banco de dados: PostgreSQL

> ⚠️ **_Não é necessário nenhum requisito e dependência de sistema além do Docker e Docker Compose_**

## ⚙️ Executando de forma local:

1) Clone o repositório para sua máquina:
    ```bash
    $ git clone https://github.com/speedlightzx/si-imobiliarias-backend
    ```

2) Suba todos os containers do Docker Compose:
    ```bash
    $ docker compose up -d
    ```

Após seguir esses passos a cima, os containers ficarão disponíveis nas seguintes URIs:

- Backend: 
    - Local: `http://localhost:3000`
    - Docker: `http://backend:3000`

- Banco de dados:
    - Local: `http://localhost:5432`
    - Docker: `http://banco-dados:5432`

> ⚠️ Importante: **_Verifique com `docker ps` se o container backend iniciou corretamente. Caso não tenha iniciado junto com o banco de dados, basta iniciar novamente com `docker start backend`_.**

## 🗃️ Variáveis de ambiente:
Crie um arquivo .env, e insira as seguintes variáveis de ambiente:

- DB_URL=postgresql://postgres:postgres@banco-dados:5432/sl_imobiliaria

- JWT_SECRET=secretjwt123

- LLM_MICROSERVICE_URL=http://microservico-python:8000

- FRONTEND_URL=http://localhost:3001

## ❓ Como se integra com os outros serviços?
O backend se integra diretamente com toda a aplicação. É o coração da aplicação. O backend é consumido pelo frontend desenvolvido em Next.js, gerenciando cookies, leads, listas e chat. Também é responsável por se comunicar com o microserviço de IA.

## 📍 Websocket:
Para se conectar no websocket, basta conectar na URL do backend usando um cliente socket.io.

## 📁 Rotas:

### 🔓 Rotas públicas:

```http
    POST /auth/register
```
- Rota para realizar o cadastro na aplicação
- Recebe os seguintes campos:
    - **email**: email a ser cadastrado
    - **password**: senha a ser cadastrada ( criptografada com argon2 )
---

```http
    POST /auth/login
```
- Rota para realizar login na aplicação
- Recebe os seguintes campos:
    - **email**: email para fazer login
    - **password**: senha para fazer login
---

### 🔐 Rotas privadas:

> _Para poder acessar as rotas privadas basta fazer login na rota /auth/login que será setado um cookie de autenticação!_

```http
    POST /leads
```
- Rota para cadastrar um novo lead
- Recebe os seguintes campos:
    - **name**: nome do lead a ser cadastrado
    - **temperature**: temperatura do lead ( Frio, Morno e Quente )
    - **status**: status do lead ( Novo, Contato, Qualificado, Visita, Proposta, Fechado, Perdido)
    - **listId**: id da lista que o lead pertence

---

```http
    PUT /leads/:id
```
- Rota para atualizar um lead
- Recebe os seguintes campos(todos opcionais):
    - **name**: nome do lead a ser cadastrado
    - **temperature**: temperatura do lead ( Frio, Morno e Quente )
    - **status**: status do lead ( Novo, Contato, Qualificado, Visita, Proposta, Fechado, Perdido)
    - **listId**: id da lista que o lead pertence

---

```http
    DELETE /leads/:id
```
- Rota para apagar um lead
---

```http
    GET /lists
```
- Rota para pegar todas as listas e lead associados
---

```http
    POST /lists
```
- Rota para criar uma nova lista
- Recebe os seguintes campos:
    - **name**: nome da lista a ser cadastrada
    - **color**: cor da lista para ser exibida(opcional)
---

```http
    PUT /lists/:id
```
- Rota para atualizar uma lista
- Recebe os seguintes campos(todos opcionais):
    - **name**: nome da lista a ser cadastrada
    - **color**: cor da lista para ser exibida
---

```http
    DELETE /lists/:id
```
- Rota para apagar uma lista
---