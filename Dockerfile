# Этап 1: Сборка приложения
FROM node:18-alpine AS builder

ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_BUCKET_NAME
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ARG NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем все зависимости (включая devDependencies)
RUN npm ci

# Копируем исходный код приложения
COPY . .

# Устанавливаем переменные среды для сборки
ENV APP_NAME=$APP_NAME
ENV NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION
ENV NEXT_PUBLIC_BUCKET_NAME=$NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_AWS_ACCESS_KEY_ID=$NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ENV NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=$NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

# Собираем приложение
RUN npm run build

# Удаляем devDependencies после сборки
RUN npm prune --production

# Этап 2: Создание финального образа
FROM node:18-alpine

WORKDIR /app

# Копируем только необходимые файлы из этапа сборки
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Устанавливаем переменные среды для запуска
ENV APP_NAME=$APP_NAME
ENV NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION
ENV NEXT_PUBLIC_BUCKET_NAME=$NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_AWS_ACCESS_KEY_ID=$NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ENV NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=$NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

EXPOSE 3000

# Запускаем приложение напрямую с помощью Node.js
CMD ["node", "build/index.js"]
