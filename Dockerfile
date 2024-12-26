# -------------------------------------------------------------
# --- Stage 1: Build the application ---
# -------------------------------------------------------------
FROM node:18-alpine AS builder

# Создаём рабочую директорию
WORKDIR /app

# 1. Копируем файлы зависимостей и устанавливаем их
COPY package*.json ./
RUN npm ci

# 2. Копируем весь проект (включая src, public и т.д.)
COPY . .

# 3. Пробрасываем build-time аргументы, если нужно,
#    чтобы Next.js "увидел" их во время сборки
ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_BUCKET_NAME
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ARG NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
ARG NEXT_PUBLIC_MAP_API_KEY

# 4. Устанавливаем их как ENV (чтобы на этапе build
#    Next.js мог использовать эти переменные)
ENV NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION
ENV NEXT_PUBLIC_BUCKET_NAME=$NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_AWS_ACCESS_KEY_ID=$NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ENV NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=$NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
ENV NEXT_PUBLIC_MAP_API_KEY=$NEXT_PUBLIC_MAP_API_KEY

# 5. Собираем Next.js (появится папка .next/)
RUN npm run build


# -------------------------------------------------------------
# --- Stage 2: Production container ---
# -------------------------------------------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# 1. Копируем package*.json из builder, чтобы установить только production-зависимости
COPY --from=builder /app/package*.json ./

# Устанавливаем только production-зависимости
# (npm ci --omit=dev требует npm>=8.6; для Node 16+ обычно так и есть)
RUN npm ci --omit=dev

# Если нужно продолжать использовать те же ARG/ENV переменные на стадии запуска
# (например, если в нашем коде есть SSR и переменные нужны на сервере),
# прокидываем их и здесь (при необходимости).
ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_BUCKET_NAME
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ARG NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
ARG NEXT_PUBLIC_MAP_API_KEY

ENV NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION
ENV NEXT_PUBLIC_BUCKET_NAME=$NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_AWS_ACCESS_KEY_ID=$NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ENV NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=$NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
ENV NEXT_PUBLIC_MAP_API_KEY=$NEXT_PUBLIC_MAP_API_KEY

# Копируем скомпилированную сборку и нужные статические файлы
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src/public ./public

# (Не забудьте, если у вас есть .env, локальные файлы и т.д.,
#   они либо копируются вручную, либо хранятся в переменных окружения)

# Порт приложения
EXPOSE 3000

# Запускаем приложение (Next.js будет использовать уже собранный бандл)
CMD ["npm", "start"]
