# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy all source files first (before removing prepare script)
COPY . .

# Now remove prepare script to avoid issues during prod install
RUN sed -i '/"prepare":/d' package.json

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and remove prepare script
COPY package.json ./
RUN sed -i '/"prepare":/d' package.json

# Copy lockfile
COPY pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

# Copy built application from builder
COPY --from=builder /app/build ./build

# Copy docs directory (needed for scopes)
COPY --from=builder /app/docs ./docs

# Expose port
EXPOSE 3000

# Run the server
CMD ["node", "build/index.js"]
