FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Copy package.json and lock files
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Install dependencies (only production if needed, but we install all to build)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build the backend API
RUN npm run build --workspace=apps/api

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod", "--workspace=apps/api"]
