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

## ❓ Como se integra com os outros serviços?
O backend se integra diretamente com toda a aplicação. É o coração da aplicação. O backend é consumido pelo frontend desenvolvido em Next.js, gerenciando cookies, leads, listas e chat. 

## 📁 Rotas:

```http
    POST /sendMessage
```
- Recebe os seguintes campos:
    - **message**: Mensagem que será processada pelo modelo de IA
---