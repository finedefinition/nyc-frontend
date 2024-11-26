# Stage 1: Build the application
FROM node:18-alpine AS builder

ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_BUCKET_NAME
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ARG NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies including devDependencies
RUN npm ci

# Copy the source code
COPY . .

# Set environment variables for the build
ENV APP_NAME=$APP_NAME
ENV NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION
ENV NEXT_PUBLIC_BUCKET_NAME=$NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_AWS_ACCESS_KEY_ID=$NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ENV NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=$NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

# Build the application
RUN npm run build

# Remove devDependencies after build
RUN npm prune --omit=dev

# Stage 2: Create the final image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./

# If you have a 'public' directory, uncomment the following line
# COPY --from=builder /app/public ./public

# Set environment variables for runtime
ENV APP_NAME=$APP_NAME
ENV NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION
ENV NEXT_PUBLIC_BUCKET_NAME=$NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_AWS_ACCESS_KEY_ID=$NEXT_PUBLIC_AWS_ACCESS_KEY_ID
ENV NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=$NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
