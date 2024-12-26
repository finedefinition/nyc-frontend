# -------------------------------------------------------------
# --- Stage 1: Build the application ---
# -------------------------------------------------------------
FROM node:23-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

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

RUN npm run build


# -------------------------------------------------------------
# --- Stage 2: Production container ---
# -------------------------------------------------------------
FROM node:23-alpine3.20 AS runner
RUN node -v    # Посмотреть версию Node
RUN npm -v     # Посмотреть версию npm

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm ci --omit=dev

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

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src/public ./public

EXPOSE 3000

CMD ["npm", "start"]
