FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:24-alpine AS runtime
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app ./

# tive que deixar o drizzle-kit como dependência normal e dar o push aqui
# pra quem for avaliar o teste não precisar subir as entidades e ficar trocando a url do banco toda hora
# fica mais fácil e prático
# pois estava tendo problema na hora de dar push no banco depois do build
CMD sh -c "npx drizzle-kit push && npm run start:prod"